// 根状态
export interface RootState {
}

// navbar 状态
export interface NavbarState {
  year: Date | null; // 选择的年份
  month: number; // 选择的月份
}

// 合并子模块后的根状态
export interface StateTree extends RootState {
  navbar: NavbarState;
}
