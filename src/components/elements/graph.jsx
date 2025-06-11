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


export const Realtimechart = props => {
    const {
        var_eje_x,
        max_range,
        min_range,
        colors: {
            backgroundColor = '#DDEEFF',
            lineColor = '#2962FF',
            textColor = 'black',
        } = {},
    } = props;

    const initialData = [
        { time: 0.01, value: max_range },
        { time: 0.02, value: min_range },
        { time: 0.03, value: 0 },
        { time: 0.04, value: 0 },
        { time: 0.05, value: 0 },
        { time: 0.06, value: 0 },
        { time: 0.07, value: 0 },
        { time: 0.08, value: 0 },
        { time: 0.09, value: 0 },
        { time: 0.1, value: 0 },
        { time: 0.11, value: 0 },
        { time: 0.12, value: 0 },
        { time: 0.13, value: 0 },
        { time: 0.14, value: 0 },
    ];

    const [chartLayoutOptions, setChartLayoutOptions] = useState({});
    // The following variables illustrate how a series could be updated.
    const series1 = useRef(null);

    const lastSecond = useRef(1);

    // The purpose of this effect is purely to show how a series could
    // be updated using the `reference` passed to the `Series` component.
    useEffect(() => {
        if (series1.current === null) {
            return;
        }

        lastSecond.current += 0.5

        const next = {
            time: lastSecond.current, // tiempo en segundos (Unix timestamp)
            value: var_eje_x,
        };

        series1.current.update(next);
    }, [var_eje_x]);

    useEffect(() => {
        setChartLayoutOptions({
            background: {
                color: backgroundColor,
            },
            textColor,
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
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
        <div ref={handleRef} style={{ width: '450px' }}>
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
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: true,
                        timeFormat: 'HH:mm:ss',
                        rightOffset: 5,
                        borderVisible: false,
                        tickMarkFormatter: time => time.toString(),
                        timeScaleType: 'time', // por defecto es 'time'
                        // Para que el eje interprete time como número:
                        timeVisible: true,
                        secondsVisible: true,
                    },
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

        chart.priceScale('right').applyOptions({
            autoScale: false,
        });

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