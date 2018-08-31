import {PriceAbnormalModel} from "./priceAbnormal.model";

/**
 * lc   房源-模型对象层
 */
export  class PropertyModel {
  /**
   * 楼盘id
   */
  estateId:string;
  /**
   * 房源id
   */
  propertyId:string;

  convId:string;
  /**
   * 房源编号后6位
   */
  convIdReq:string;
  /**
   * 楼盘名称
   */
  estateName:string;

  /**
   * 楼栋号
   */
  buildingNo:string;
  /**
   * 单元号
   */
  unitNo:string;
  /**
   * 楼层
   */
  floorNo:string;
  /**
   * 房间号
   */
  houseNo:string;
  /**
   * 建筑面积
   */
  spaceSize:string;
  /**
   * 套内面积
   */
  innerSpaceSize:string;

  /**
   * 价格
   */
  propertyPrice:string;
  /**
   * 室
   */
  bedrooms:string;

  halls:string;

  bathrooms:string;

  kitchens:string;
  /**
   * 阳
   */
  balconies:string;
  /**
   * 房屋朝向
   */
  orientation:string;
  /**
   * 装修水平
   */
  decoration:string;
  /**
   * 联系人
   */
  contacts:any;
  /**
   *姓名
   */
  contact:string;
  /**
   * 性别
   */
  sex:string;
  /**
   * 电话
   */
  contactInfo:string;
  /**
   * 电话2
   */
  contactInfo2:string;

  /**
   * 房源标签
   */
  tags:string;
  /**
   * 实勘图片
   */
  propertyPics?:any;
  /**
   * 多个房源标签组合列表
   */
  tagsStr?:any;
  /**
   * 建筑类型
   */
  buildingType:any;
  /**
   * 配备电梯
   */
  hasElevator:string;

  elevators:any;

  apartments:any;
  /**
   * 描述
   */
  propertyDesc:any;
  standardAddress?:any;
  /**
   * 敏感信息隐藏
   */
  notShow?:any;
  /**
   * 均价
   */
  propertyPerPrice?:any;
  /**
   * 1 万元    2 元
   */
  propertyPriceUnit?:any;

  buzzType?:any;

  //权限控制字段
  shareShow?:boolean;

  closePropertyShow?:boolean;

  applyStatus?:boolean;

  realtorUpdateShow?:boolean;
  /**
   * 异常价格
   */
  propertyAuditContentVo?:PriceAbnormalModel;
  /**
   * 区县码值
   */
  adminDivisionCode?:any;

  realtorId?:any;
  /**
   * 钥匙信息
   */
  keyPics?:any;
  /**
   * 业主委托书
   */
  attorneyPics?:any;

  /**
   * 列表首图
   */
  propAvatar?:any;

  propertyType?:any;

  propertyLife?:any;

  buzzOwnerType?:any;

  propertyMortgage?:any;

  businessTime?:any;

  propertyAbPriceVo?:any;
}
