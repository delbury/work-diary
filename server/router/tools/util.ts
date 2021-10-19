/**
 * 处理 query 参数
 */
type FormatParamsOptionType = 'string' | 'number' | 'array-string' | 'array-number';
type FormatParamsOptionValue = string | number | string[] | number[];
type FormatParamsOptionMap= Record<string, FormatParamsOptionType>;
export const formatParams = <T extends FormatParamsOptionMap>(params: any, options: T) => {
  const res: {
    [key in keyof T]?: FormatParamsOptionValue;
  } = {};

  // 处理参数
  Object.entries(options).map(([k, val]) => {
    const key = k as keyof T;
    switch(val) {
      case 'string':
        res[key] = params[key] || null;
        break;
      case 'number':
        res[key] = Number(params[key]) ?? null;
        break;
      case 'array-number':
        res[key] = params[key]
          ? (
            (params[key] as string).split(',').map(it => Number(it))
          )
          : ([]);
        break;
      case 'array-string':
        res[key] = params[key]
          ? (
            (params[key] as string).split(',')
          )
          : ([]);
        break;
      default:
        return;
    }
  });

  return res as Required<typeof res>;
};
