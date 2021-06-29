import React, { useEffect, useState, useRef } from 'react';
import LeftSvg from './svg/leftSvg';
import RightSvg from './svg/rightSvg';
import dayjs, { parseNumber2List } from './utils/dayjs';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { DateItem } from './index';
import { Dayjs } from 'dayjs';
const cache = new CellMeasurerCache({ defaultHeight: 205, fixedWidth: true });
interface PropsType {
    dateList: Array<DateItem>;
}
const nowTime = dayjs();
function DatePicker(props: PropsType) {
    const ListRef = useRef(null);
    const dateContentRef = useRef(null);
    const [headerDate, setHeaderDate] = useState(dayjs());
    const [scrollToIndex, setScrollToIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log('DatePicker useEffect');
    }, []);

    const nextMonth = () => {
        const nextMonth = headerDate.add(1, 'month');
        setHeaderDate(nextMonth);
    };
    const lastMonth = () => {
        const lastMonth = headerDate.subtract(1, 'month');
        if (lastMonth.isBefore(dayjs().subtract(1, 'month'))) {
            return;
        }
        setHeaderDate(lastMonth);
    };
    const backNowMonth = () => {
        if (headerDate === dayjs()) return;
        setHeaderDate(dayjs());
    };

    // 判断元素是否在可见范围内
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
                        console.log('当前展示的item:', visibleList[0]);
                        setCurrentIndex(index);
                    }
                }
            }, 40);
        }
    };

    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    const _rowRenderer = ({ key, index, parent, style }: { key: any; index: number; parent: any; style: any }) => {
        const time = props.dateList[index].time;
        const dayCounts = props.dateList[index].days;
        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
                <div style={{ ...style }} data-index={index}>
                    {time.format('YYYYMMDD') !== dayjs().format('YYYYMMDD') && <p className="date-desc">{time.format('M月')}</p>}
                    <div className="calendar">
                        <RenderCalendarWeeks dayCounts={dayCounts} time={time} />
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
                    <button onClick={lastMonth} className={headerDate.subtract(1, 'month').isBefore(dayjs().subtract(1, 'month')) ? 'disable' : 'btn'}>
                        <LeftSvg />
                    </button>
                    <button onClick={backNowMonth} className={headerDate.subtract(1, 'month').isBefore(dayjs().subtract(1, 'month')) ? 'disable' : 'btn'}>
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
                            height={180}
                            overscanRowCount={10}
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

const RenderCalendarWeeks = (props: { dayCounts: number; time: Dayjs }) => {
    const { dayCounts, time } = props;
    console.log('==================RenderCalendarWeeks');
    // let dateInfo: any ;
    let dateInfo: any = parseNumber2List(dayCounts, time);

    let ReactNodeList = [];
    for (const key in dateInfo) {
        ReactNodeList.push(
            <div key={key} className="calendar-weeks">
                {dateInfo[key].map((item: { day: number; week: number }, index: number) => (
                    <button key={index}>
                        <span className="circle">{item.day && <span>{item.day}</span>}</span>
                    </button>
                ))}
            </div>,
        );
    }
    return <React.Fragment>{ReactNodeList.map((item) => item)}</React.Fragment>;
};
export default React.memo(DatePicker);
