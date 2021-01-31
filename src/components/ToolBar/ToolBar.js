import React, { useContext } from 'react'
import { ToolContext } from '../ToolProvider'
import './ToolBar.css'

import select from '../../assets/select.svg'
import selectActive from '../../assets/select-active.svg'
import rectangle from '../../assets/rectangle.svg'
import rectangleActive from '../../assets/rectangle-active.svg'
import ellipse from '../../assets/ellipse.svg'
import ellipseActive from '../../assets/ellipse-active.svg'
import triangle from '../../assets/triangle.svg'
import triangleActive from '../../assets/triangle-active.svg'
import line from '../../assets/line.svg'
import lineActive from '../../assets/line-active.svg'
import arrow from '../../assets/arrow.svg'
import arrowActive from '../../assets/arrow-active.svg'

export default function ToolBar() {
    return (
        <div className="tool-box">
            <h2>TOOLS</h2>
            <Tool key="1" type="selection" images={ [select, selectActive] }/>            
            <Tool key="2" type="rectangle" images={ [rectangle, rectangleActive] }/>
            <Tool key="3" type="ellipse" images={ [ellipse, ellipseActive] }/>
            <Tool key="4" type="triangle" images={ [triangle, triangleActive] }/>
            <Tool key="5" type="line" images={ [line, lineActive] }/>
            <Tool key="6" type="arrow" images={ [arrow, arrowActive] }/>
        </div>
    )
}

function Tool(props) {
    const [tool, setTool] = useContext(ToolContext)
    const {type, images} = props
    const [inactiveImg, activeImg] = images

    const handleChange = () => {
        setTool(type)
    }

    return (        
        <label className="tool">
            <input
                type="radio"
                value={ type }
                checked={ tool === type }
                onChange={ handleChange }                
            />
            <img
                src={ tool === type ? activeImg : inactiveImg } 
                alt={ type }
            />
            <span>{ type.charAt(0).toUpperCase() + type.slice(1) }</span>           
        </label>        
    )
}