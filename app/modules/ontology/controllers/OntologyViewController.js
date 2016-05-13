(function(angular, vis) {

  'use strict';

  function OntologyViewController($scope, $state, $q, $mdDialog, OntologyDataService) {

    this.data = {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet()
    };

    this.network = undefined;
    this.query = '';
    this.state = $state.$current;
    this.baseState = this.state.parent.toString();

    var _findNode = (label) => {

      return this.data.nodes.get({
        filter: function (item) {
          return item.label === label;
        }
      });
    };

    var _createNode = (label) => {

      var node = _findNode(label);

      if (node.length == 0) {

        var newNode = {
          id: this.data.nodes.length + 1,
          label: label
        };

        this.data.nodes.add(newNode);
        node = _findNode(label);
      }

      return node[0];
    };

    var _findEdge = (from, to, label) => {

      return this.data.edges.get({
        filter: function(item) {
          return ((item.from == from) && (item.to == to) && (item.label === label));
        }
      });
    };

    var _createEdge = (from, to, label) => {

      var edge = _findEdge(from, to, label);

      if (edge.length == 0) {

        var newEdge = {
          from: from,
          to: to,
          label: label
        };

        this.data.edges.add(newEdge);
        edge = _findEdge(from, to, label);
      }

      return edge[0];
    };

    var _loadNode = (nodeLabel) => {

      var queryString = nodeLabel.startsWith('http://') ? nodeLabel : `http://purl.org/goodrelations/v1#${nodeLabel}`;
      OntologyDataService.node(queryString)
       .then((results) => {
         $q.when(true).then(() => {
           results.map((item) => {

             var subjNode = _createNode(item.subject);
             var objNode = _createNode(item.object);

             _createEdge(subjNode.id, objNode.id, item.predicate);
             this.network.fit();
           });
         });
       });
    };

    var _createGraph = () => {

      var container = document.getElementById('ontology-graph');
      this.network = new vis.Network(container, this.data, { });

      this.network.on('selectNode', (params) => {
        var selectedNodeId = params.nodes[0];
        var selectedNode = this.data.nodes.get(selectedNodeId);
        console.log(selectedNode);
        _loadNode(selectedNode.label);
      });
    };

    this.initialize = function() {
      _createGraph();
      var init = [OntologyDataService.initialize()];
      return init;
    };

    this.search = (evt) => {

      if ((evt === undefined) || (evt.keyCode === 13)) {
        _loadNode(this.query);
      }
      else if ((evt !== undefined) && (evt.keyCode === 27)) {
        this.reset();
      }

      return;
    };

    this.reset = () => {
      $q.when(true).then(() => {
        this.query = '';
        this.data.nodes.clear();
        this.data.edges.clear();
        this.network.destroy();
        _createGraph();
      });
    };

  }

  module.exports = OntologyViewController;

})(global.angular, global.vis);
