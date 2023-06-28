// Main application single entry point
requirejs([
    'jquery',
    'd3',
    'js/models/network',
    'js/views/network',
    'js/views/modal',
], function($, d3, NetworkModel, NetworkView, NetworkModal) {

    // Data plotted in network
    var data1 = {
        "directed": true,
        "nodes": [
            {
                "id": 0,
                "binary": "Los Angeles County",
                "value": 0.7209916383731492
            },
            {
                "id": 1,
                "binary": "San Bernardino County",
                "value": 0.611001296910286
            },
            {
                "id": 2,
                "binary": "Contra Costa County",
                "value": 0.6165684944400186
            },
            {
                "id": 4,
                "binary": "Sacramento County",
                "value": 0.6997787020858645
            },
            {
                "id": 5,
                "binary": "Alameda County",
                "value": 0.6048806236241692
            },
            {
                "id": 6,
                "binary": "Santa Clara County",
                "value": 0.608302481155999
            },
            {
                "id": 7,
                "binary": "Placer County",
                "value": 0.6092810229306018
            },
            {
                "id": 9,
                "binary": "Kern County",
                "value": 0.6297437646923267
            },
            {
                "id": 11,
                "binary": "San Joaquin County",
                "value": 0.6358742645467044
            },
            {
                "id": 14,
                "binary": "Yolo County",
                "value": 0.6052246795418703
            },
            {
                "id": 18,
                "binary": "Solano County",
                "value": 0.7210258864500971
            },
            {
                "id": 19,
                "binary": "Fresno County",
                "value": 0.6208392345217814
            },
            {
                "id": 22,
                "binary": "Yuba County",
                "value": 0.6521010329173264
            },
            {
                "id": 23,
                "binary": "Sonoma County",
                "value": 0.6167979046377365
            },
            {
                "id": 27,
                "binary": "Napa County",
                "value": 0.6361353585295987
            },
            {
                "id": 29,
                "binary": "Tehama County",
                "value": 1.093418394335498
            },
            {
                "id": 30,
                "binary": "Sutter County",
                "value": 0.6004416229127659
            },
            {
                "id": 31,
                "binary": "Marin County",
                "value": 0.6042549055524611
            },
            {
                "id": 32,
                "binary": "Glenn County",
                "value": 1.0373136058100904
            },
            {
                "id": 33,
                "binary": "Shasta County",
                "value": 0.6717048470399646
            },
            {
                "id": 35,
                "binary": "Butte County",
                "value": 0.6278289538120843
            },
            {
                "id": 37,
                "binary": "Mendocino County",
                "value": 1.0595831817708589
            },
            {
                "id": 38,
                "binary": "Lake County",
                "value": 1.0058754222245715
            },
            {
                "id": 40,
                "binary": "Colusa County",
                "value": 1.0547446839750015
            },
            {
                "id": 42,
                "binary": "Siskiyou County",
                "value": 0.632127184577395
            },
            {
                "id": 43,
                "binary": "Lassen County",
                "value": 0.6204524798309767
            },
            {
                "id": 46,
                "binary": "Trinity County",
                "value": 1.010557263593355
            },
            {
                "id": 47,
                "binary": "Humboldt County",
                "value": 1.0235566900252816
            },
            {
                "id": 49,
                "binary": "Del Norte County",
                "value": 0.6148412216274604
            }
        ],
        "links": [
            {
                "source": 15,
                "target": 19
            },
            {
                "source": 18,
                "target": 20
            },
            {
                "source": 15,
                "target": 20
            },
            {
                "source": 21,
                "target": 13
            },
            {
                "source": 22,
                "target": 13
            },
            {
                "source": 22,
                "target": 21
            },
            {
                "source": 23,
                "target": 16
            },
            {
                "source": 23,
                "target": 9
            },
            {
                "source": 21,
                "target": 22
            },
            {
                "source": 15,
                "target": 18
            },
            {
                "source": 18,
                "target": 15
            },
            {
                "source": 26,
                "target": 19
            },
            {
                "source": 22,
                "target": 14
            },
            {
                "source": 27,
                "target": 26
            },
            {
                "source": 27,
                "target": 3
            },
            {
                "source": 27,
                "target": 19
            },
            {
                "source": 15,
                "target": 3
            },
            {
                "source": 27,
                "target": 21
            },
            {
                "source": 21,
                "target": 27
            },
            {
                "source": 23,
                "target": 18
            },
            {
                "source": 23,
                "target": 3
            },
            {
                "source": 26,
                "target": 27
            },
            {
                "source": 27,
                "target": 28
            },
            {
                "source": 22,
                "target": 3
            },
            {
                "source": 18,
                "target": 19
            },
            {
                "source": 18,
                "target": 23
            },
            {
                "source": 23,
                "target": 20
            },
            {
                "source": 21,
                "target": 3
            },
            {
                "source": 15,
                "target": 27
            },
            {
                "source": 18,
                "target": 3
            },
            {
                "source": 27,
                "target": 13
            },
            {
                "source": 21,
                "target": 4
            },
            {
                "source": 23,
                "target": 10
            },
            {
                "source": 27,
                "target": 0
            },
            {
                "source": 15,
                "target": 24
            },
            {
                "source": 22,
                "target": 10
            },
            {
                "source": 22,
                "target": 4
            },
            {
                "source": 21,
                "target": 0
            },
            {
                "source": 21,
                "target": 19
            },
            {
                "source": 26,
                "target": 3
            },
            {
                "source": 18,
                "target": 24
            },
            {
                "source": 23,
                "target": 12
            },
            {
                "source": 15,
                "target": 9
            },
            {
                "source": 15,
                "target": 16
            },
            {
                "source": 22,
                "target": 2
            },
            {
                "source": 22,
                "target": 9
            },
            {
                "source": 22,
                "target": 23
            },
            {
                "source": 22,
                "target": 6
            },
            {
                "source": 18,
                "target": 16
            },
            {
                "source": 22,
                "target": 17
            },
            {
                "source": 18,
                "target": 9
            },
            {
                "source": 15,
                "target": 23
            },
            {
                "source": 15,
                "target": 6
            },
            {
                "source": 22,
                "target": 5
            },
            {
                "source": 22,
                "target": 27
            },
            {
                "source": 15,
                "target": 21
            },
            {
                "source": 22,
                "target": 20
            },
            {
                "source": 15,
                "target": 25
            },
            {
                "source": 22,
                "target": 19
            },
            {
                "source": 15,
                "target": 26
            },
            {
                "source": 15,
                "target": 8
            },
            {
                "source": 23,
                "target": 6
            },
            {
                "source": 18,
                "target": 6
            },
            {
                "source": 23,
                "target": 15
            },
            {
                "source": 23,
                "target": 21
            },
            {
                "source": 23,
                "target": 22
            },
            {
                "source": 18,
                "target": 21
            },
            {
                "source": 26,
                "target": 15
            },
            {
                "source": 23,
                "target": 13
            },
            {
                "source": 23,
                "target": 14
            },
            {
                "source": 18,
                "target": 12
            },
            {
                "source": 26,
                "target": 20
            },
            {
                "source": 23,
                "target": 8
            },
            {
                "source": 18,
                "target": 0
            },
            {
                "source": 23,
                "target": 19
            },
            {
                "source": 23,
                "target": 4
            },
            {
                "source": 26,
                "target": 11
            },
            {
                "source": 26,
                "target": 1
            },
            {
                "source": 26,
                "target": 0
            },
            {
                "source": 26,
                "target": 24
            },
            {
                "source": 26,
                "target": 7
            }
        ],
        "multigraph": false,
        "graph": []
    }


    var data = [data1];

    this.network_model = new NetworkModel(data);

    // Filter nodes based on links
    var filteredNodes = [];
    var connectedNodes = new Set();
    this.network_model.get('links').forEach(function(link) {
        connectedNodes.add(link.source);
        connectedNodes.add(link.target);
    });

    this.network_model.get('nodes').forEach(function(node) {
        if (connectedNodes.has(node.id)) {
            filteredNodes.push(node);
        }
    });

    this.network_model.set('nodes', filteredNodes);


    // Initializing backbone model for network app.
    this.network_model = new NetworkModel( data );

    // Initializing all backbone views.
    this.network_modal = new NetworkModal();
    this.network_view = new NetworkView( { "model" : this.network_model } );
    
    // Introduce trajectory logic
    // this.trajectory_model = new TrajectoryModel( trajectory );
    // this.trajectory_table = new TrajectoryTable( {"model" : this.trajectory_model });
    // this.trajectory_view = new TrajectoryView( { "model" : this.trajectory_model, "network_view" : this.network_view});

});