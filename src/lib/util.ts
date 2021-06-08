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
