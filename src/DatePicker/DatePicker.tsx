import React, { useEffect, useState, useRef } from 'react';
import LeftSvg from './svg/leftSvg';
import RightSvg from './svg/rightSvg';
import dayjs, { parseNumber2List } from './utils/dayjs';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { DateItem } from './index';
import { Dayjs } from 'dayjs';
import classNames from 'classnames';
const cache = new CellMeasurerCache({ defaultHeight: 205, fixedWidth: true });
interface PropsType {
    scheduleTime: string;
    dateList: Array<DateItem>;
    selectDate: (date: string) => void;
}
function MemoHoc(Component: any) {
    return React.memo(Component);
}
function DatePicker(props: PropsType) {
    const initHeaderDate = props.scheduleTime ? dayjs(props.scheduleTime) : dayjs();
    const ListRef = useRef(null);
    const dateContentRef = useRef(null);
    const [headerDate, setHeaderDate] = useState<Dayjs>(initHeaderDate);
    const [scrollToIndex, setScrollToIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (props.scheduleTime) {
            const yeardif = dayjs(props.scheduleTime).year() - dayjs().year();
            const mounthdif = dayjs(props.scheduleTime).month() - dayjs().month();
            const index = yeardif * 12 + mounthdif;
            setCurrentIndex(index);
            setScrollToIndex(index);
        }
    }, []);

    // next month
    const nextMonth = () => {
        setCurrentIndex(currentIndex + 1);
        setScrollToIndex(currentIndex + 1);
    };
    // last month
    const lastMonth = () => {
        if (headerDate.format('YYYYMMDD') === dayjs().format('YYYYMMDD')) {
            return;
        }
        // setHeaderDate(lastMonth);
        setCurrentIndex(currentIndex - 1);
        setScrollToIndex(currentIndex - 1);
    };
    // back current month
    const backNowMonth = () => {
        if (headerDate.format('YYYYMMDD') === dayjs().format('YYYYMMDD')) {
            return;
        }
        // setHeaderDate(dayjs());
        setCurrentIndex(0);
        // setScrollToIndex(0);
        // @ts-ignore
        ListRef.current.scrollToRow(0);
    };

    // Determines if the element is in the visible range
    const elementIsVisibleInViewport = (el: any, parent: any) => {
        const { bottom } = el.getBoundingClientRect();
        const { top: parentTop, bottom: parentBottom } = parent.getBoundingClientRect();
        const isVisible = bottom > 0 && bottom > parentTop + 5 && bottom < parentBottom;
        return isVisible;
    };
    const onScroll = () => {
        const dateDom = dateContentRef.current;
        // @ts-ignore
        dateDom && dateDom.timeId && clearTimeout(dateDom.timeId);

        if (dateDom) {
            // @ts-ignore
            dateDom.timeId = setTimeout(() => {
                const dateList = document.querySelectorAll('.ReactVirtualized__Grid__innerScrollContainer>div');
                const visibleList = [...dateList].filter((item) => {
                    const bol = elementIsVisibleInViewport(item, dateDom);
                    return bol;
                });
                if (visibleList[0]) {
                    const dataIndex = visibleList[0].getAttribute('data-index');
                    if (dataIndex) {
                        const index = parseInt(dataIndex);
                        // console.log('当前展示的item:', visibleList[0]);
                        setCurrentIndex(index);
                        setHeaderDate(dayjs().add(index, 'M'));
                    }
                }
            }, 50);
        }
    };

    const _rowRenderer = ({ key, index, parent, style }: { key: any; index: number; parent: any; style: any }) => {
        const time = props.dateList[index].time;
        const dayCounts = props.dateList[index].days;
        const dateInfo = props.dateList[index].dateInfo;
        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <div style={{ ...style }} data-index={index}>
                    {time.format('YYYYMMDD') !== dayjs().format('YYYYMMDD') && <p className="date-desc">{time.format('M月')}</p>}
                    <div className="calendar">
                        <RenderCalendarWeeks selectDate={props.selectDate} dayCounts={dayCounts} time={time} dateInfos={dateInfo} scheduleTime={props.scheduleTime} />
                    </div>
                </div>
            </CellMeasurer>
        );
    };
    return (
        <div className="scheduler-date-picker">
            <div className="scheduler-date-picker-header">
                <div className="month">{headerDate.format('M月 YYYY')}</div>
                <div className="actions">
                    <button onClick={lastMonth} className={headerDate.format('YYYYMM') === dayjs().format('YYYYMM') ? 'disable' : 'btn'}>
                        <LeftSvg />
                    </button>
                    <button onClick={backNowMonth} className={headerDate.format('YYYYMM') === dayjs().format('YYYYMM') ? 'disable' : 'btn'}>
                        <div>
                            <div className="outline-circle"></div>
                        </div>
                    </button>
                    <button onClick={nextMonth} className="btn">
                        <RightSvg />
                    </button>
                </div>
            </div>
            <div className="scheduler-date-picker-week">
                <div className="week-labels">
                    <div>周一</div>
                    <div>周二</div>
                    <div>周三</div>
                    <div>周四</div>
                    <div>周五</div>
                    <div>周六</div>
                    <div>周日</div>
                </div>
            </div>
            <div className="scheduler-date-picker-content" ref={dateContentRef}>
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <List
                            ref={ListRef}
                            scrollToAlignment="start"
                            height={185}
                            overscanRowCount={3}
                            rowCount={props.dateList.length}
                            rowHeight={cache.rowHeight}
                            rowRenderer={_rowRenderer}
                            scrollToIndex={scrollToIndex}
                            width={width}
                            onScroll={onScroll}
                        />
                    )}
                </AutoSizer>
            </div>
        </div>
    );
}

/**
 *  渲染每一行日期 对应 星期数
 */
const RenderCalendarWeeks = MemoHoc((props: { dayCounts: number; time: Dayjs; dateInfos?: any; selectDate: (date: string) => void; scheduleTime: string }) => {
    const { dayCounts, time, dateInfos, selectDate, scheduleTime } = props;
    // let dateInfo: any ;
    let dateInfo: any = dateInfos ? dateInfos : parseNumber2List(dayCounts, time);

    let ReactNodeList = [];
    const selectHandle = (time: Dayjs, day: number) => {
        const date = `${time.format('YYYY年M月')}${day}日`;
        selectDate(date);
    };
    for (const key in dateInfo) {
        ReactNodeList.push(
            <div key={key} className="calendar-weeks">
                {dateInfo[key].map((item: { day: number; week: number }, index: number) => {
                    const spanClass = classNames('circle', {
                        weekend: item.week === 0 || item.week === 6,
                        today: time.format('YYYYMM') === dayjs().format('YYYYMM') && item.day === dayjs().date(),
                        active: dayjs(scheduleTime).format('YYYYMM') === time.format('YYYYMM') && item.day === dayjs(scheduleTime).date(),
                    });
                    return (
                        <button key={index}>
                            {item.day && (
                                <span className={spanClass} onClick={() => selectHandle(time, item.day)}>
                                    <span>{item.day}</span>
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>,
        );
    }
    return <React.Fragment>{ReactNodeList.map((item) => item)}</React.Fragment>;
});

export default React.memo(DatePicker);
