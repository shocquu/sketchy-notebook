import React, {
    useRef,
    useEffect,
    useLayoutEffect,
    useState,
    useContext,
} from 'react';
import { ToolContext } from '../ToolProvider';
import rough from 'roughjs/bundled/rough.esm';

const useHistory = (initialState) => {
    // Undo / Redo
};

export default function Canvas() {
    const [tool, setTool] = useContext(ToolContext);
    const [action, setAction] = useState(null);
    const [selected, setSelected] = useState(null);
    const [elements, setElements] = useState([]);

    const canvasRef = useRef(null);
    const roughCanvasRef = useRef(null);
    const generator = rough.generator();

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        roughCanvasRef.current = rough.canvas(canvas);

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.clearRect(0, 0, canvas.width, canvas.height);
        elements.forEach(({ element }) => roughCanvasRef.current.draw(element));
    }, [elements]);

    /*useLayoutEffect(() => {
        console.log('called')
        if(selected) {
            removeResizeHandler()            
            //addResizeHandler(selected)
        } else {            
            removeResizeHandler()
        }
        
    }, [selected])*/

    const handleMouseUp = () => {
        if (action === 'drawing' || action === 'resizing') {
            const index = elements.length - 1;
            const { x1, y1, x2, y2 } = getAdjustedCoordinates(elements[index]);
            updateElement(index, tool, { x1, y1, x2, y2 });
        }

        setAction('none');
    };

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;

        if (tool === 'selection') {
            const element = getElementAtPosition(clientX, clientY);

            if (element) {
                const { x1, y1, x2, y2 } = element;

                if (selected && selected.id === element.id) {
                    const width = x2 - x1;
                    const height = y2 - y1;
                    setSelected({
                        ...element,
                        offsetX: clientX - x1,
                        offsetY: clientY - y1,
                        width,
                        height,
                    });
                    setElements((prevState) => prevState);
                    setAction('moving');
                } else {
                    removeResizeHandler();

                    if (element.position !== 'empty' && !selected) {
                        setSelected(element);
                        addResizeHandler(element);
                        event.target.style.cursor = element
                            ? setCursor(element.position)
                            : 'default';
                    }
                }
            } else {
                setSelected(null);
                removeResizeHandler();
            }
        } else {
            selected && removeResizeHandler();
            const id = elements.length;
            const coords = {
                x1: clientX,
                y1: clientY,
                x2: clientX,
                y2: clientY,
            };
            const element = createElement(id, tool, coords);
            setElements((prevState) => [...prevState, element]);
            setAction('drawing');
        }
    };

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        if (tool === 'selection' && selected) {
            const element = getElementAtPosition(clientX, clientY);
            event.target.style.cursor = element
                ? setCursor(element.position)
                : 'default';
        }

        if (action === 'drawing') {
            const index = elements.length - 1;
            const elementToUpdate = elements[index];
            const { x1, y1 } = elementToUpdate;
            const coords = { x1, y1, x2: clientX, y2: clientY };
            updateElement(index, tool, coords);
        } else if (action === 'moving') {
            const { id, offsetX, offsetY, width, height } = selected;
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            updateElement(id, selected.type, {
                x1: x,
                y1: y,
                x2: x + width,
                y2: y + height,
            });
        }
    };

    const createElement = (id, type, coords, lockRatio = false) => {
        let { x1, y1, x2, y2 } = coords;
        let element;
        const options = {
            fill: 'red',
        };

        switch (type) {
            case 'line':
                element = generator.line(x1, y1, x2, y2, options);
                break;
            case 'rectangle':
                element = lockRatio
                    ? generator.rectangle(x1, y1, x2 - x1, x2 - x1, options)
                    : generator.rectangle(x1, y1, x2 - x1, y2 - y1, options);
                break;
            case 'ellipse':
                element = lockRatio
                    ? generator.ellipse(
                          (x1 + x2) / 2,
                          (y1 + y2) / 2,
                          x2 - x1,
                          x2 - x1,
                          options
                      )
                    : generator.ellipse(
                          (x1 + x2) / 2,
                          (y1 + y2) / 2,
                          x2 - x1,
                          y2 - y1,
                          options
                      );
                break;
            case 'triangle':
                element = lockRatio
                    ? generator.path(
                          `M ${x1},${y2} L ${x2},${y2} L ${
                              (x2 - x1) / 2 + x1
                          },${
                              ((x1 - x2) * Math.sqrt(3)) / 2 + y2
                          } L ${x1},${y2} Z`,
                          options
                      )
                    : generator.path(
                          `M ${x1},${y2} L ${x2},${y2} L ${
                              (x2 - x1) / 2 + x1
                          },${(y2 - y1) / 2 + y1} L ${x1},${y2} Z`,
                          options
                      );
                break;
            case 'arrow':
                const radians = 0.4;
                const [diffX, diffY] = [x1 - x2, y1 - y2];
                const newX =
                    (diffX * Math.cos(radians) + diffY * Math.sin(radians)) /
                        10 +
                    x2;
                const newY =
                    (-diffX * Math.sin(radians) + diffY * Math.cos(radians)) /
                        10 +
                    y2;
                const newX2 =
                    (diffX * Math.cos(radians) - diffY * Math.sin(radians)) /
                        10 +
                    x2;
                const newY2 =
                    (diffX * Math.sin(radians) + diffY * Math.cos(radians)) /
                        10 +
                    y2;

                element = generator.path(
                    `M ${x1},${y1} L ${x2},${y2} L ${newX},${newY} M ${x2},${y2} L ${newX2},${newY2} Z`
                );
                break;
            case 'outline':
                const offset = 6;

                element = generator.rectangle(
                    x1 - offset,
                    y1 - offset,
                    x2 - x1 + 2 * offset,
                    y2 - y1 + 2 * offset,
                    {
                        roughness: 0.5,
                        stroke: 'grey',
                        strokeWidth: 2,
                        strokeLineDash: [5, 10],
                    }
                );
                break;
            default:
                element = generator.line(x1, y1, x2, y2, options);
                break;
        }

        return { id, type, x1, y1, x2, y2, element };
    };

    const removeElement = (id, length = 1) => {
        const newElements = [...elements];
        newElements.splice(id, length);
        setElements(newElements);
    };

    const updateElement = (id, type, coords) => {
        const updatedElement = createElement(id, type, coords);
        const newElements = [...elements];
        newElements[id] = updatedElement;

        if (selected && tool === 'selection') {
            const { x1, y1 } = coords;
            const outlineElement = createElement(
                elements.length - 2,
                'outline',
                coords
            );
            const resizer = createElement(elements.length - 1, 'outline', {
                x1: x1 - 2,
                y1: y1 - 2,
                x2: x1 + 2,
                y2: y1 + 2,
            });
            newElements[elements.length - 2] = outlineElement;
            newElements[elements.length - 1] = resizer;
        }

        setElements(newElements);
    };

    const getDistance = (a, b) =>
        Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

    const getElementAtPosition = (x, y) => {
        return elements
            .map((element) => ({
                ...element,
                position: getPositionWithinElement(x, y, element),
            }))
            .find((element) => element.position !== null);
    };

    const getAdjustedCoordinates = (element) => {
        const { type, x1, y1, x2, y2 } = element;
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        switch (type) {
            case 'rectangle':
            case 'ellipse':
                return { x1: minX, y1: minY, x2: maxX, y2: maxY };
            case 'triangle':
                return { x1, y1, x2, y2 }; // To Fix
            case 'line':
                const coords =
                    x1 < x2 || (x1 === x2 && y1 < y2)
                        ? { x1, y1, x2, y2 }
                        : { x1: x2, y1: y2, x2: x1, y2: y1 };
                return coords;
            case 'arrow':
                return { x1, y1, x2, y2 }; // To Fix
            default:
                return { x1, y1, x2, y2 };
        }
    };

    const getPositionWithinElement = (x, y, element) => {
        const { type, x1, y1, x2, y2 } = element;
        const middleX = (x2 - x1) / 2;
        const middleY = (y2 - y1) / 2;
        const offset = 6;

        if (type === 'rectangle' || type === 'ellipse' || type === 'triangle') {
            if (
                Math.abs(x - offset) > x1 &&
                Math.abs(x + offset) < x2 &&
                Math.abs(y - offset) > y1 &&
                Math.abs(y + offset) < y2
            ) {
                if (element.element.options.fill) {
                    return 'inside';
                } else {
                    return 'empty';
                }
            } else {
                const topLeft = nearPoint(x, y, x1, y1, offset, 'topLeft');
                const topRight = nearPoint(x, y, x2, y1, offset, 'topRight');
                const bottomLeft = nearPoint(
                    x,
                    y,
                    x1,
                    y2,
                    offset,
                    'bottomLeft'
                );
                const bottomRight = nearPoint(
                    x,
                    y,
                    x2,
                    y2,
                    offset,
                    'bottomRight'
                );
                const edge =
                    Math.abs(x - x1) < offset ||
                    Math.abs(x - x2) < offset ||
                    Math.abs(y - y1) < offset ||
                    Math.abs(y - y2) < offset
                        ? 'edge'
                        : null;

                return topLeft || topRight || bottomLeft || bottomRight || edge;
            }
        } else {
            const a = { x: x1, y: y1 };
            const b = { x: x2, y: y2 };
            const c = { x, y };
            const distance =
                getDistance(a, b) - (getDistance(a, c) + getDistance(b, c));
            const start = nearPoint(x, y, x1, y1, offset, 'start');
            const end = nearPoint(x, y, x2, y2, offset, 'end');
            const inside = Math.abs(distance) < offset ? 'inside' : null;

            return start || end || inside;
        }
    };

    const nearPoint = (x, y, x1, y1, offset, name) =>
        Math.abs(x - x1) < offset && Math.abs(y - y1) < offset ? name : null;

    const addResizeHandler = (element) => {
        const { x1, y1, x2, y2 } = element;
        const outline = createElement(elements.length, 'outline', {
            x1,
            y1,
            x2,
            y2,
        });
        setElements((prevState) => [...prevState, outline]);

        const resizer = createElement(elements.length + 1, 'outline', {
            x1: x1 - 4,
            y1: y1 - 4,
            x2: x1 - 2,
            y2: y1 - 2,
        });
        setElements((prevState) => [...prevState, resizer]);
    };

    const removeResizeHandler = () => {
        const outline = elements.find((element) => element.type === 'outline');

        if (outline) {
            removeElement(outline.id, 2);
            setSelected(null);
            setAction(null);
        }
    };

    const setCursor = (position) => {
        switch (position) {
            case 'inside':
                return 'move';

            default:
                break;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
                backgroundImage: `url(${
                    process.env.PUBLIC_URL + '/images/noise.png'
                })`,
            }}
        >
            Your browser doesn't support canvas
        </canvas>
    );
}
