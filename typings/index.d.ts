
declare interface AnyObject {
  [key: string]: any;
}
/* TForm */
declare namespace FormTypes {
  interface FormOpts {
    ref: any; // 表单实例
    labelPosition?: string; // label对齐方式
    labelWidth?: string; // label宽度
    btnSlotName?: string; // 按钮插槽名称
    formData: AnyObject; // 表单数据
    fieldList: FieldList[]; // 表单项
    rules?: any; // 表单验证规则
    listTypeInfo?: any; // 下拉框数据
    operatorList?: OperatorList[]; // 操作按钮
  }
  interface FieldList {
    isHideItem?: boolean; // 是否隐藏
    label?: string; // label
    value?: string; // 字段名
    labelSlotName?: string; // label插槽名称
    labelRender?: (...ags: any[]) => any; // label render渲染
    className?: string; // 表单项class
    isTrim?: boolean; // el-input 是否去除空格
    rules?: any; // 表单项验证规则
    widthSize?: number; // 表单项宽度
    slotName?: string; // 表单输入框插槽名称
    textShow?: boolean; // 是否文本展示
    textValue?: string; // 文本展示值
    isSelfCom?: boolean; // 是否自定义组件
    type?: string; // 表单类型
    ref?: string; // 表单组件实例
    list?: string; // 下拉框数据变量名称
    arrLabel?: string; // 下拉框label字段
    arrKey?: string; // 下拉框value字段
    event?: string; // 触发handleEvent事件的标识
    comp?: any; // 组件名称
    placeholder?: string; // 提示语
    bind?: any; // 绑定数据(Objec or Function(formData))
    width?: string; // 组件宽度
    prepend?: string; // el-input输入框前置内容
    append?: string; // el-input输入框后置内容
    childSlotName?: string; // 子组件插槽名称
    eventHandle?: AnyObject; // 事件处理函数
  }
  interface OperatorList {
    label?: string; // 按钮名称
    fun?: (val: any) => void; // 按钮点击事件
    bind?: AnyObject; // 绑定数据
    isHideBtn?: boolean; // 是否隐藏按钮
    render?: (...ags: any[]) => any; // render函数
  }
}
/* TQueryCondition */
declare namespace QueryTypes {
  interface Opts {
    [key: string]: {
      label: string; // 列名
      comp: string; // 组件名
      span?: number; // 表单栅格
      bind?: any; // 绑定值
      defaultVal?: any; // 默认值
      isSelfCom?: boolean; // 是否是自定义组件
      type?: string; // 组件类型
      list?: string; // 下拉列表变量名
      listTypeInfo?: any; // 下拉列表数据源
      arrLabel?: string; // 下拉列表label
      arrKey?: string; // 下拉列表value
      eventHandle?: any; // 事件处理函数 };
    };
  }
}
/* TTable */
declare namespace TableTypes {
  interface Table {
    border?: boolean; // 是否显示边框
    firstColumn?: any[] | AnyObject; // 第一列数据
    rules?: AnyObject; // 表单验证规则
    listTypeInfo?: any; // 字典过滤
    operator?: any; // 操作按钮
    operatorConfig?: AnyObject; // 操作列配置
    currentPage?: Number; // 当前页码
    pageSize?: Number; // 每页条数
    total?: Number; // 总条数
    layout?: string; // 分页布局
    prevText?: string; // 上一页文本
    nextText?: string; // 下一页文本
    size?: string; // 分页尺寸
    data: any[]; // 表格数据
    columns: Columns[]; // 表格列
  }
  interface Columns {
    prop?: string; // 列字段
    label?: string; // 列标题
    width?: string | number; // 列宽度
    minWidth?: string | number; // 列最小宽度
    align?: string; // 列对齐方式
    fixed?: string; // 列固定
    type?: string; // 列类型
    sortable?: any; // 列是否可排序
    sort?: any; // 列排序方式
    isShowCol?: boolean | Function; // 列是否显示
    align?: string; // 列对齐方式
    fixed?: string; // 列固定
    bind?: AnyObject; // el-table-column 属性
    headerRequired?: boolean; // 表头是否显示必填红点
    renderHeader?: (...ags: any[]) => any; // 自定义表头
    render?: (...ags: any[]) => any; // 自定义列内容
    slotName?: string; // 自定义列内容插槽
    canEdit?: boolean; // 是否可编辑
    isClickEdit?: boolean; // 是否点击编辑
    isShowEditIcon?: boolean; // 是否显示编辑图标
    configEdit?: ConfigEdit; // 编辑配置
    filters?: Filters; // 字典过滤
    children?: any[]; // 子列
  }
  interface Filters {
    list: string; // 字典列表
    key: string; // 字典key
    label: string; // 字典label
  }
  interface ConfigEdit {
    rules?: any; // 校验规则
    editSlotName?: string; // 编辑插槽
    isSelfCom?: boolean; // 是否自定义组件
    bind?: any; // 组件属性(Objec or Function)
    editComponent?: any; // 编辑组件
    placeholder?: string; // 占位符
    width?: string | number; // 编辑框宽度
    type?: string; // 编辑框类型
    prepend?: string; // el-input前缀
    append?: string; // el-input后缀
    ref?: string; // ref
    isShowTips?: boolean; // 是否显示tips
    label?: string; // label
    list?: string; // 下拉数据字段名称
    arrLabel?: string; // 下拉数据label字段名称
    arrKey?: string; // 下拉数据value字段名称
    event?: string; // 触发handleEvent事件的标识
    eventHandle?: any; // 事件处理
  }
}


/* Vite */
declare type Recordable<T = any> = Record<string, T>;

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};
// Map声明全局变量
declare interface TypeMap {
  [key: string]: { type: string; val: string };
}
