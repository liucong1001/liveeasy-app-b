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
  contacts:object;

  /**
   * 房源标签
   */
  tags:string;

  // buildingNo:['',Validators.required], //楼栋号
  // unitNo:['',Validators.required],//单元号
  // floorNo:['',[Validators.required,Validators.maxLength(5)]],//楼层
  // houseNo:[''],//房间号
  // space_size:[''],//建筑面积
  // inner_space_size:[''],//套内面积
  // property_price:[''],//价格
  // bedrooms:['1'],//室
  // halls:['1'],
  // bathrooms:['1'],
  // kitchens:['1'],
  // balconies:['1'],//阳
  // orientation:[null],//房屋朝向
  // decoration:[null],//装修水平
  // contacts:this.fb.array([
  //                          this.fb.group({
  //     contact:[''],
  //     contactType:['mobile'],
  //     contactInfo:[''],
  //     sex:[''],
  //     desc:[''],
  //   })
  //                        ]),//业主信息
  // contact:[],
  // contactInfo:[],
  // contactInfo2:[],
  // sex:[],
  // tags:[''],//房源标签

}
