import { createChart, LineSeries, AreaSeries } from 'lightweight-charts';
import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const Context = createContext();

const initialData = [
    { time: '2018-10-11', value: 52.89 },
    { time: '2018-10-12', value: 51.65 },
    { time: '2018-10-13', value: 51.56 },
    { time: '2018-10-14', value: 50.19 },
    { time: '2018-10-15', value: 51.86 },
    { time: '2018-10-16', value: 51.25 },
];

const currentDate = new Date(initialData[initialData.length - 1].time);

export const App = props => {
    const {
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
        } = {},
    } = props;

    const [chartLayoutOptions, setChartLayoutOptions] = useState({});
    // The following variables illustrate how a series could be updated.
    const series1 = useRef(null);
    const started = true;

    // The purpose of this effect is purely to show how a series could
    // be updated using the `reference` passed to the `Series` component.
    useEffect(() => {
        if (series1.current === null) {
            return;
        }
        let intervalId;

        intervalId = setInterval(() => {
            currentDate.setDate(currentDate.getDate() + 1);
            const next = {
                time: currentDate.toISOString().slice(0, 10),
                value: 53 - 2 * Math.random(),
            };
            series1.current.update(next);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [started]);  //! Cambiar por valor

    useEffect(() => {
        setChartLayoutOptions({
            background: {
                color: backgroundColor,
            },
            textColor,
        });
    }, [backgroundColor, textColor]);

    return (
        <Chart layout={chartLayoutOptions}>
            <Series
                ref={series1}
                type={'line'}
                data={initialData}
                color={lineColor}
            />
        </Chart>
    );
};

export function Chart(props) {      // CRea contenedor que contendrá el gráfico
    const [container, setContainer] = useState(false);
    const handleRef = useCallback(ref => setContainer(ref), []);
    return (
        <div ref={handleRef} style={{ width: '600px' }}>
            {container && <ChartContainer {...props} container={container} />}
        </div>
    );
}

export const ChartContainer = forwardRef((props, ref) => {
    const { children, container, layout, ...rest } = props;

    const chartApiRef = useRef({
        isRemoved: false,
        api() {
            if (!this._api) {
                this._api = createChart(container, {
                    ...rest,
                    layout,
                    width: container.clientWidth,
                    height: 200,
                });
                this._api.timeScale().fitContent();
            }
            return this._api;
        },
        free(series) {
            if (this._api && series) {
                this._api.removeSeries(series);
            }
        },
    });

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        const chart = currentRef.api();

        const handleResize = () => {
            chart.applyOptions({
                ...rest,
                width: container.clientWidth,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chartApiRef.current.isRemoved = true;
            chart.remove();
        };
    }, []);

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api();
    }, []);

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api().applyOptions(rest);
    }, []);

    useImperativeHandle(ref, () => chartApiRef.current.api(), []);

    useEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api().applyOptions({ layout });
    }, [layout]);

    return (
        <Context.Provider value={chartApiRef.current}>
            {props.children}
        </Context.Provider>
    );
});
ChartContainer.displayName = 'ChartContainer';

export const Series = forwardRef((props, ref) => {
    const parent = useContext(Context);
    const context = useRef({
        api() {
            if (!this._api) {
                const { children, data, type, ...rest } = props;
                this._api =
                    type === 'line'
                        ? parent.api().addSeries(LineSeries, rest)
                        : parent.api().addSeries(AreaSeries, rest);
                this._api.setData(data);
            }
            return this._api;
        },
        free() {
            if (this._api && !parent.isRemoved) {
                // remove only current series
                parent.free(this._api);
            }
        },
    });

    useLayoutEffect(() => {
        const currentRef = context.current;
        currentRef.api();

        return () => currentRef.free();
    }, []);

    useLayoutEffect(() => {
        const currentRef = context.current;
        const { children, data, ...rest } = props;
        currentRef.api().applyOptions(rest);
    });

    useImperativeHandle(ref, () => context.current.api(), []);

    return (
        <Context.Provider value={context.current}>
            {props.children}
        </Context.Provider>
    );
});
Series.displayName = 'Series';