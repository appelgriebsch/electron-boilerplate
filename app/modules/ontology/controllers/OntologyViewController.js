(function(angular, vis) {

  'use strict';

  function OntologyViewController($scope, $state, $q, $mdDialog, OntologyDataService) {

    this.graphOptions = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 20,
          max: 30,
          label: {
            min: 14,
            max: 30,
            drawThreshold: 9,
            maxVisible: 20
          }
        },
        font: {
          size: 14,
          face: 'Helvetica Neue, Helvetica, Arial'
        }
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: false,
        selectConnectedEdges: true
      }
    };

    this.data = {
      nodes: new vis.DataSet(),
      edges: new vis.DataSet()
    };

    this.network = undefined;
    this.query = undefined;
    this.searchText = '';
    this.baseURI = '';
    this.classes = [];
    this.state = $state.$current;
    this.baseState = this.state.parent.toString();

    var _findNode = (identifier) => {

      return this.data.nodes.get({
        filter: function(item) {
          return item.identifier === identifier;
        }
      });
    };

    var _createNode = (identifier) => {

      var node = _findNode(identifier);

      if (node.length == 0) {

        var label = OntologyDataService.labelForNode(identifier);
        var newNode = {
          id: this.data.nodes.length + 1,
          identifier: identifier,
          label: label,
          title: identifier
        };

        this.data.nodes.add(newNode);
        node = _findNode(identifier);
      }

      return node[0];
    };

    var _findEdge = (from, to, identifier) => {

      return this.data.edges.get({
        filter: function(item) {
          return ((item.from == from) && (item.to == to) && (item.identifier === identifier));
        }
      });
    };

    var _createEdge = (from, to, identifier) => {

      var edge = _findEdge(from, to, identifier);

      if (edge.length == 0) {

        var label = OntologyDataService.labelForEdge(identifier);
        var newEdge = {
          from: from,
          to: to,
          identifier: identifier,
          title: label
        };

        if (label === 'isA') {
          newEdge.arrows = {
            to: {
              scaleFactor: 0.5
            }
          };
          newEdge.dashes = true;
        }

        this.data.edges.add(newEdge);
        edge = _findEdge(from, to, identifier);
      }

      return edge[0];
    };

    var _loadNode = (nodeLabel) => {

      var queryString = nodeLabel.startsWith('http://') ? nodeLabel : `${this.baseURI}#${nodeLabel}`;
      var owlURI = OntologyDataService.uriForPrefix('owl');

      OntologyDataService.node(queryString)
        .then((results) => {
          $q.when(true).then(() => {
            results.forEach((item) => {

              if (item.object !== `${owlURI}Class`) {

                var subjNode = _createNode(item.subject);
                var objNode = _createNode(item.object);

                _createEdge(subjNode.id, objNode.id, item.predicate);
              }
            });

            this.network.fit();
          });
        });
    };

    var _createGraph = () => {

      var container = document.getElementById('ontology-graph');
      this.network = new vis.Network(container, this.data, this.graphOptions);

      this.network.on('selectNode', (params) => {
        var selectedNodeId = params.nodes[0];
        var selectedNode = this.data.nodes.get(selectedNodeId);
        _loadNode(selectedNode.identifier);
      });
    };

    this.initialize = function() {
      _createGraph();
      var init = [OntologyDataService.initialize()];
      Promise.all(init).then(() => {
        return OntologyDataService.ontology();
      }).then((result) => {
        this.baseURI = result;
        return OntologyDataService.classes();
      }).then((result) => {
        this.classes = result;
      }).catch((err) => {
        console.log(err);
      });
    };

    this.findTerm = (searchText) => {

      var foundNodes = [];
      this.classes.forEach((entry) => {
        var idx = entry.label.search(searchText);
        if (idx != -1) {
          foundNodes.push(entry);
        }
      });

      return foundNodes;
    };

    this.search = () => {

      var identifier = this.query ? this.query.identifier : '';

      if (identifier.length > 0) {
        _loadNode(identifier);
      } else {
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
