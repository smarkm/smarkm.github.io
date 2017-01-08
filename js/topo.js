$(".article-content").append("<div id='topo' style='height:520px;width:100%;'></div>");

  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: "spring", label: 'Spring'},
    {id: "spring_framwork", label: 'Spring Framwork',group:"java"},
    {id: "spring_boot", label: 'Spring Boot',group:"java"},
    {id: "spring_cloud", label: 'Spring Cloud',group:"java"},
    {id: "java", label: 'Java',group:"java"},
    {id: "jsr", label: 'JSR',group:"java"},
    {id: "python", label: 'Python',group:"python"},
    {id: "js", label: 'JS*',group:"js"},

    {id: "计算", label: '计算',group:"计算"},
    {id: "存储", label: '存储',group:"存储"},

    {id: "通信", label: '通信',group:"通信"},
    {id: "corba", label: 'Corba',group:"通信"},
    {id: "zookeeper", label: 'Zookeeper',group:"通信"},

    {id: "storm", label: 'Storm',group:"计算"},
    {id: "hadoop", label: 'Hadoop',group:"计算"},
    {id: "hdfs", label: 'HDFS',group:"存储"},
    {id: "mongo", label: 'Mongo',group:"存储"},

    {id: "可视化_UX", label: '可视化 & UX',group:"UX"},
    {id: "cordova", label: 'Cordova',group:"UX"},
    {id: "android", label: 'Android',group:"UX"},
    {id: "browser", label: 'Browser',group:"UX"},
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: "spring", to: "spring_framwork"},
    {from: "spring", to: "spring_boot"},
    {from: "spring", to: "spring_cloud"},
    {from: "java", to: "spring"},
    {from: "java", to: "jsr"},
    {from: "计算", to: "storm"},
    {from: "计算", to: "hadoop"},
    {from: "存储", to: "hdfs"},
    {from: "存储", to: "mongo"},
    {from: "存储", to: "通信"},

    {from: "通信", to: "计算"},
    {from: "通信", to: "corba"},
    {from: "通信", to: "zookeeper"},

    {from: "计算", to: "可视化_UX"},

    {from: "可视化_UX", to: "存储"},
    {from: "可视化_UX", to: "cordova"},
    {from: "可视化_UX", to: "android"},
    {from: "可视化_UX", to: "browser"},

    {from: "python", to: "java"},
    {from: "js", to: "java"},
    {from: "js", to: "python"},
  ]);

  // create a network
  var container = document.getElementById('topo');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
