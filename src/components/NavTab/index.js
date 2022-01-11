import '@/style/navTab.scss'
import {useEffect, useState} from "react";
import { useAliveController } from 'react-activation'
import {useDispatch, useSelector,} from "react-redux";
import {setTabList} from '@/redux/commen/index.js'
import routerConfig from '@/utils/config.js'
import {useHistory,useLocation} from "react-router-dom";

function NavTabComponent (){
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [activeIndex,setActiveIndex] = useState(0);
    const tabList = useSelector(({commenStore}) =>commenStore.tabList)
    const showTabList = tabList.tabList? Array.from(tabList.tabList) : [];
    const { drop, dropScope, clear, getCachingNodes } = useAliveController();
    const deleteTabHandler = (element)=>(e)=>{
        e.stopPropagation();
        if(showTabList.length>1){
            //保留一个打开页
            let deleteIndex = -1;
            let buildData = [];
            showTabList.forEach((value,index)=>{
                if(element.key == value.key){
                    deleteIndex = index;
                }else{
                    buildData.push(value)
                }
            })
            if(element.key == window.location.pathname){
                //删除的标签为当前页，则往前推进一个索引,如果是索引为零，则向后退一个
                let routePath = deleteIndex? showTabList[deleteIndex - 1].key : showTabList[1].key;
                history.push(routePath)
            }
            dropScope(routerConfig[element.key].keepAliveName)
            dispatch(setTabList({'tabList':buildData}))
        }
    }
    const goToRouterPageHandler = (element)=>()=>{
        history.push(element.key)
    }
    const pathnameRouter = location.pathname;
    useEffect(()=>{
        let targetRouter = Object.keys(routerConfig);
        if(targetRouter.indexOf(pathnameRouter) == -1)return;
        let targetArray = [];
        let isHaveRouter = false;
        showTabList.forEach((element,index)=>{
            if(element.key == pathnameRouter){
                targetArray.push(element);
                setActiveIndex(index);
                isHaveRouter = true;
            }
        })
        if(!isHaveRouter && showTabList.length){
            setActiveIndex(showTabList.length);
        }
        if(!targetArray.length || showTabList.length == 0){
            showTabList.push(routerConfig[pathnameRouter]);
            dispatch(setTabList({'tabList':showTabList}))
        }
    },[pathnameRouter])
    return (
        <div className='nav_tab_container'>
            {showTabList.map((element,index) =>{
                return (
                    <div className={`nav_tab_row ${activeIndex == index ? 'nav_tab_row_active':''}`} key={`${index}showTabList`} onClick={goToRouterPageHandler(element)}>
                        <span>{element.name}</span>
                        <i className='iconfont icon-quancha' onClick={deleteTabHandler(element)}></i>
                    </div>
                )
            })}
        </div>
    )
}

export default NavTabComponent