export const ONE_DAY_TIME = 86400000;

// id 生成器
let idCount = 0; // 若时间错重复的计数器
let lastTimestamp: number | null = null; // 上一次生成了 id 使用的时间戳
export const uniqueIdGenerator = (): string => {
  const newTimestamp = Date.now();
  let newId = newTimestamp.toString();
  if(lastTimestamp !== null && newTimestamp === lastTimestamp) {
    // 时间戳重复
    idCount++;
  } else {
    idCount = 0;
  }
  newId += idCount.toString().padStart(3, '0');
  lastTimestamp = newTimestamp;

  return newId;
};

type DateParam = string | Date | number;

// 计算第几周
export const getWeek = (dateParam: DateParam): [number, number] => {
  const date = new Date(dateParam);
  const dateStart = new Date(dateParam);
  dateStart.setMonth(0);
  dateStart.setDate(1);
  const d = Math.round((date.valueOf() - dateStart.valueOf()) / 86400000);
  const week = Math.ceil((d + dateStart.getDay() - 1) / 7);
  const year = date.getFullYear();
  return [year, week];
};

// 周格式化
export const weekFormattor = (dateParam: DateParam): string => {
  if(!dateParam) return '-';
  const [year, week] = getWeek(dateParam);
  return `${year} 第 ${week} 周`;
};

// 日期格式化
export const dateFormattor = (dateParam: DateParam): string => {
  const date = new Date(dateParam);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 计算当前月包含的周
export interface WeekItem {
  startDate: Date;
  endDate: Date;
  year: number;
  week: number;
  label: string;
  value: string;
  range: string;
  // 一周内每天
  days: {
    date: Date;
    label: string;
    value: string;
  }[];
}
export const getCurrentMonthWeeks = (
  baseDate: Date,
  baseMonth: number = baseDate.getMonth(),
  needDays = false,
) => {
  const date = new Date(baseDate);
  const curMonth = baseMonth;
  date.setMonth(curMonth);
  date.setDate(1);
  const list: WeekItem[] = [];
  while(date.getMonth() === curMonth) {
    const offset = (date.getDay() + 6) % 7;
    const startDate = new Date(date.valueOf() - ONE_DAY_TIME * offset);
    const endDate = new Date(startDate.valueOf() + ONE_DAY_TIME * 6);
    const [year, week] = getWeek(startDate);
    date.setTime(endDate.valueOf() + ONE_DAY_TIME);
    list.push({
      startDate,
      endDate,
      year,
      week,
      label: `${year} 第 ${week} 周`,
      value: `${year}-${week}`,
      range: `${dateFormattor(startDate)} ~ ${dateFormattor(endDate)}`,
      days: (() => {
        const arr: WeekItem['days'] = [];
        for(let i = 0; i < 7; i++) {
          const d = new Date(startDate.valueOf() + ONE_DAY_TIME * i);
          const value = dateFormattor(d);
          arr.push({
            date: d,
            label: `${new Intl.DateTimeFormat('zh-CN', { weekday: 'short' }).format(d)}（${value}）`,
            value,
          });
        }
        return arr;
      })(),
    });
  }
  return list;
};
