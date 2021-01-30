import React, {useRef, useEffect, useLayoutEffect, useState} from 'react'
import rough from 'roughjs/bundled/rough.esm'

export default function Canvas() {
    const [tool, setTool]         = useState('ellipse')
    const [action, setAction]     = useState(null)
    const [elements, setElements] = useState([])

    const canvasRef = useRef(null)    
    const roughCanvasRef = useRef(null)
    const generator = rough.generator()    

    useLayoutEffect(() => {
        const canvas  = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        roughCanvasRef.current = rough.canvas(canvas)

        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.clearRect(0, 0, canvas.width, canvas.height)
        elements.forEach( ({element}) => roughCanvasRef.current.draw(element) )
    }, [elements])
    
    const handleMouseUp = () => {
        setAction('none')
    }

    const handleMouseDown = (event) => {
        const {clientX, clientY} = event
       
        const id = elements.length
        const coords = { x1: clientX, y1: clientY, x2: clientX, y2: clientY }
        const element = createElement(id, 'line', coords)
        setElements(prevState => [...prevState, element])
        setAction('drawing')
    }    

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event

        if(action === 'drawing') {
            const index = elements.length - 1
            const elementToUpdate = elements[index]
            const {x1, y1} = elementToUpdate
            
            const coords = { x1, y1, x2: clientX, y2: clientY }
            updateElement(index, coords)
        }
    }

    const createElement = (id, type, coords) => {
        const { x1, y1, x2, y2 } = coords
        let element

        switch (type) {
            case 'line':
                element = generator.line(x1, y1, x2, y2)
                break
            case 'rectangle':
                element = generator.rectangle(x1, y1, x2 - x1, y2 - y1)
                break
            case 'ellipse':
                element = generator.ellipse(x1, y1, 10, 10)
                break;
            case 'triangle':
                element = generator.line(x1, y1, x2, y2)
                break
            default:
                element = generator.line(x1, y1, x2, y2)
                break
        }

        return { id, type, x1, y1, x2, y2, element }
    }

    const updateElement = (id, coords) => {
        const updatedElement = createElement(id, tool, coords)
        const newElements = [...elements]
        newElements[id] = updatedElement
        setElements(newElements)
    }

    //const getDistance = () => 

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >Your browser doesn't support canvas
        </canvas>
    )
} 