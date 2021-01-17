/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button } from 'element-ui'
import { Container } from 'element-ui'
import { Header } from 'element-ui'
import { Main } from 'element-ui'
import { Footer } from 'element-ui'
import { Menu } from 'element-ui'
import { MenuItem } from 'element-ui'
import { MenuItemGroup } from 'element-ui'
import { Card } from 'element-ui'
import { Form } from 'element-ui'
import { FormItem } from 'element-ui'
import { Input } from 'element-ui'
// 导入弹框提示组件
import { Message } from 'element-ui'
import { Col } from 'element-ui'
import { Row } from 'element-ui'
import { Submenu } from 'element-ui'
import { Carousel } from 'element-ui'
import { CarouselItem } from 'element-ui'
import { Aside } from 'element-ui'
import { Breadcrumb } from 'element-ui'
import { BreadcrumbItem } from 'element-ui'
import { Table } from 'element-ui'
import { TableColumn } from 'element-ui'
import { Pagination } from 'element-ui'
// 上传组件
import { Upload } from 'element-ui'
// 头像
import { Avatar } from 'element-ui'
// 标签
import { Tag } from 'element-ui'
// 图片
import { Image } from 'element-ui'
import { Select } from 'element-ui'
import { Option } from 'element-ui'
// 对话框
import { Dialog } from 'element-ui'
// 弹出框
import { Popover } from 'element-ui'
import { Divider } from 'element-ui'
import { Tabs } from 'element-ui'
import { TabPane } from 'element-ui'
import { Steps } from 'element-ui'
import { Step } from 'element-ui'
import { Loading } from 'element-ui'
// 文字链接
import { Link } from 'element-ui'
// 开关
import { Switch } from 'element-ui'
import { InfiniteScroll } from 'element-ui'
import { Cascader } from 'element-ui'
import { DatePicker } from 'element-ui'
// 折叠面板
import { Collapse } from 'element-ui'
import { CollapseItem } from 'element-ui'
// 时间线
import { Timeline } from 'element-ui'
import { TimelineItem } from 'element-ui'

// 返回顶部
import { Backtop } from 'element-ui'

// 下拉菜单
import { Dropdown } from 'element-ui'
import { DropdownMenu } from 'element-ui'
import { DropdownItem } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
Vue.use(Submenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Aside)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Loading)
Vue.use(Link)
Vue.use(Switch)
Vue.use(InfiniteScroll)
Vue.use(Cascader)
Vue.use(DatePicker)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Backtop)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popover)

// 挂载弹框提示组件
Vue.prototype.$message = Message
