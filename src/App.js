import Canvas from './components/Canvas/Canvas'
import ToolBar from './components/ToolBar/ToolBar'
import ToolContext from './components/ToolProvider'
import './App.css'

export default function App() {
  return (
    <ToolContext>
      <ToolBar/>
      <Canvas/>
    </ToolContext>
  )
}
