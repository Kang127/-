import G6 from "@antv/g6";
import ImgTest from "./img.json";
const data = {
  nodes: [
    {
      id: "test_img",
      label: "测试",
      img: ImgTest.base64Img,
      type: "rect-img",
      nodeType: "node", //此类型用来区分几种节点（普通节点、锚点、分组）
      x: 100,
      y: 100,
      color: "rgb(49,158,236)", //此属性为了方便颜色的返填
      size: 100,
      labelCfg: {
        style: {
          fill: "rgb(49,158,236)",
          fontSize: 12
        },
        position: "bottom"
      },
      style: {
        fill: "rgba(0,0,0,0)", //背景填充色
        lineWidth: 0
      }
    }
  ]
  
};
document.getElementById("Test").onclick = function() {
  const item = graph.findById("test_img");
  debugger;
  const model = item.getModel();
  model.labelCfg.style.fontSize = 50;
  graph.updateItem(item, model);
};
const width = document.getElementById("container").scrollWidth;
const height = document.getElementById("container").scrollHeight || 500;
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ["drag-node"]
  },
  nodeStateStyles: {
    hover: {},
    selected: {
      lineWidth: 3,
      fill: "rgba(0,0,0,0)" //背景填充色
    }
  }
});
G6.registerNode(
  "rect-img",
  {
    afterDraw(cfg, item) {
      debugger;
      // 添加图片
      let _cfg = cfg;
      _cfg.x = -cfg.size / 2;
      _cfg.y = -cfg.size / 2;
      _cfg.width = cfg.size;
      _cfg.height = cfg.size;
      debugger;
      item.addShape("image", {
        attrs: _cfg,
        draggable: true,
        name: "image-shape"
      });
    },
    update: undefined,
    afterUpdate: undefined,
    setItemState: undefined
  },
  "rect"
);
graph.data(data);
graph.render();

graph.on("node:click", evt => {
  const { item } = evt;
  debugger;
  graph.setItemState(item, "selected", !item.hasState("selected"));
});
