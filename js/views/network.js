/*
General network graph of nodes and edges.
*/

define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/network'
], function($, $ui, d3, backbone, NetworkModel) {

    // --------------------------------------
    // Network View
    // --------------------------------------

    var NetworkView = backbone.View.extend({

        initialize: function(){
            //
            //Initialize network view
            //
            this.element = "#network_viewer";

            // Parameters for building network
            this.width = this.model.get("width");
            this.height = this.model.get("height");

            // Initialize the svg width
            this.svg = d3.select(this.element).append("svg")
                .attr("width", 790)
                .attr("height", this.height);

            // Initialize the force
            this.force = d3.layout.force()

            // Get model data
            this.node_data = _.clone(this.model.get("nodes"));
            this.link_data = _.clone(this.model.get("links"));
            this.node_shape_data = this.model.get("node_shape");

            // Start force simulation.
            this.start_force(this.node_data, this.link_data);

            // Get nodes
            this.force_nodes = this.force.nodes();
            this.force_links = this.force.links();

            this.draw_links(this.link_data);
            this.draw_nodes(this.node_data);
            this.node_shape(this.node_shape_data);
            this.node_text();
            this.node_color();
            this.force_on();
            //this.size_slider();
            //this.form();
            //this.update_data();
        },

        /*
        ----------------------------------------------------------
        Network initializing
        ----------------------------------------------------------
        */

        start_force: function(nodes, links){
            //
            //Starts D3's force network simulation
            //
            this.force
                .nodes(nodes)
                .links(links)
                .charge(this.model.get("charge"))
                .linkDistance(this.model.get("link_distance"))
                .size([this.width-300, this.height-10])
                .start()
        },

        draw_nodes: function(nodes) {
            //
            // Add node data to D3 force simulation.
            //

            // Define the node data and link to svg object id
            this.nodes = this.svg.selectAll(".graph_node")
                .data(nodes, function(d){ return d.id; });

            // Create an svg group object for node drawing and
            // enter the drawing

            this.nodes.enter()
                .append("g")
                    .attr("class", "graph_node")
                    .attr("id", function(d) {return "node_"+d.index})
                    .call(this.force.drag);

            // Remove old data when updating.
            this.nodes.exit().remove();
        },

        draw_links: function(links) {
            //
            // Add link data to D3 force simulation.
            //

            // Define link data and point to svg object id
            this.links = this.svg.selectAll(".graph_link")
                    .data(links, function(d){ return d.id; })

            // Create line svg objects for links and draw
            this.links.enter()
                .append("line")
                    .attr("class", "graph_link")
                    .attr("id", function(d) {return d.id})
                    .attr("stroke", function(d){ return d.color; })
                    .attr("stroke-width", function(d){ return d.width; })
                    .attr("opacity", function(d){ return d.opacity; })
                    .attr("stroke-opacity", function(d) { return d.opacity; });

            // Remove any old data on update
            this.links.exit().remove();

        },

        /*
        ----------------------------------------------------------
        Setting node and SVG representations.
        ----------------------------------------------------------
        */

        node_shape: function(shape) {
            //
            // Add shapes to each node in D3 force simulation.
            //
            // Parameter:
            // ---------
            // shape: string
            // SVG shape for each node.
            //

            var interpolateRadius = d3.interpolate(2, 13);

            var circles = this.nodes.append(shape)
                .attr("class", "graph_circle")
                .attr("id", function(d) {return "node-"+d.index})
                .attr("node-index", function(d) {return d.index})
                .attr("r", function(d){ return interpolateRadius(d.value) });

            this.circles = circles;
        },

        node_text: function(){
            //
            //Add text to each node based on each node's "id".
            //

            var interpolateRadius = d3.interpolate(2, 13);

            this.labels = this.nodes.append("text")
                .attr("class", "graph_text")
                .attr("dx", function(d) {return interpolateRadius(d.value)})
                .attr("dy", ".35em")
                .text(function(d) { return d.binary; });
        },

        node_color: function() {
            //
            //Add color to each node based on the node's "value".
            //
            var colors = d3.interpolate('orange', 'purple');

            this.nodes
                .attr("fill", function(d){ return colors(d.value)});

            $('#colorbutton').click(function() {
                var colorUpdate = d3.interpolate('blue', 'red');

                d3.selectAll(".graph_node").transition()
                    .each("start", function() { d3.select(this) })
                    .attr("fill", function(d){return colorUpdate(d.value)});
            });
        },

        force_on: function() {
            //
            // How to handle each tick in a force simulation.
            // Force object updates the svg representation.
            //
            var scope = this;

            this.force.on("tick", function () {

                scope.links
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                scope.nodes
                    .attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                })
            });

            this.force
                .start();
        },

        /*
        ----------------------------------------------------------
        Update node a link repesentation SVG representations.
        ----------------------------------------------------------
        */

        force_add_node: function(node){
            //
            // Add node to network and draw it.
            //
            this.force_nodes.push(node);
            this.force_update();

        },

        force_add_link: function(link){
            //
            // Add link to network and draw it.
            //
            this.force_links.push(link);
            this.force_update();
        },

        force_rm_link: function(id) {
            // Remove link from force links

            // Find link and remove it
            for ( var i=0; i < this.force_links.length; i++ ) {
                if ( this.force_links[i].id == id ){
                    var index = i;
                }
            }
            this.force_links.splice(index, 1);
            this.force_update();
        },

        force_update: function(){
            //
            // Restart the force
            //
            this.draw_links(this.force_links);
            this.draw_nodes(this.force_nodes);
            this.force_on();
        },

        /*
        ----------------------------------------------------------
        Network Widgets
        ----------------------------------------------------------
        */

        size_slider: function() {
            var scope = this;
            var interpolateRadius = d3.interpolate(2, 13);

            $(function() {
                $( "#slider" ).slider({
                    value: 1,
                    min: 0,
                    max: 6,
                    step: .25,
                    slide: function( event, ui ) {
                        $( "#amount" ).val( ui.value );
                        scope.labels.transition().duration(300)
                            .attr("dx", function(d) {return interpolateRadius(d.value * ui.value)});
                        scope.circles.transition().duration(300)
                            .attr("r", function(d) {return interpolateRadius(d.value * ui.value)});
                    }
                });
                $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
            });
        },

        form: function() {

            // Define scope.
            var scope = this;

            var tags = function(key){
                var nodes = scope.model.get("nodes");
                var node_names = [];
                for(var i = 0; i < nodes.length; i++){
                    node_names.push(nodes[i].id);
                }

                return node_names;
            }

            $( "#inputNumber" ).autocomplete({
                source: tags()
            });

            $("#gobutton").click(function(){

                var numInput = $("#inputNumber").val();

                var nodes = scope.model.get("nodes");
                var node_names = [];

                for(var i = 0; i < nodes.length; i++){
                    node_names.push(nodes[i].id);

                    if (node_names[i] === numInput) {
                        var interpolateRadius = d3.interpolate(1, 15);
                        $("#node-"+nodes[i].name)
                            .attr("r", 40 )
                    }
                }

            });

        },

        update_data: function() {

            var scope = this;

            // Create dataMenu object for dropdown menu.
            var dataMenu = function() {}

            dataMenu.prototype.add_element = function(element) {
                //
                //Create an element in dropdown.
                //
                // Construct dropdown label.
                label = $("<a>").attr("id", "dropdown-" + element)
                .attr("href","#")
                .text(element);

                // Construct html element here
                html_el = $("<li>").append(label)
                return html_el;
            }

            dataMenu.prototype.build_list = function(parent, elements){
                /*
                Append html list elements to parent html element.

                Args:
                ----
                parent: string
                html-element id for appending list.
                elements: array of strings
                array of text to append html list and make clickable.
                */
                for (var e = 0; e < elements.length; e++) {
                    dropdown = this.add_element(elements[e]);
                    $(parent).append(dropdown);
                    dropdown.click(e, click_reference);
                }
            }

            var get_refs = function(key){
                //
                //Get dataset's refs.
                //
                var datasets = scope.model.get("datasets");
                var refs = [];

                for (var i = 0; i < datasets.length; i++) {
                    refs.push(datasets[i].ref);
                }
                return refs;
            }

            var click_reference = function(d){
                //
                // Function to switch data when different reference
                // is selected from dropdown menu.
                //
                var index = d.data;
                var new_data = scope.model.get("datasets")[index];

                var new_nodes = new_data["nodes"];
                var new_links = new_data["links"];

                var change_node_value = function(data) {
                    //
                    // Changes model's node values inplace.
                    //
                    var old_nodes = scope.model.get("nodes");
                    for (var i = 0; i < old_nodes.length; i++) {
                        old_nodes[i].value = data[i].value;
                    }
                }

                // Change the nodes inplace
                change_node_value(new_nodes);

                // Lets the slider keep track of the new data size.
                scope.size_slider();

                var nodeUpdate = scope.nodes
                    .attr("id", function(d) {return "node_"+d.name});

                nodeUpdate.select("circle").transition().duration(1000)
                    .attr("id", function(d) {return "node-"+d.index})
                    .attr("node-index", function(d) {return d.index})
                    .attr("r", function(d){ return d3.interpolate(2, 60)(d.value) });

                nodeUpdate.select("text").transition().duration(1000)
                    .attr("dx", function(d) {return d3.interpolate(2, 60)(d.value)});

                nodeUpdate.transition().duration(1000)
                    .attr("fill", function(d){ return d3.interpolate('orange', 'purple')(d.value)});

            }

            var datasets = scope.model.get("datasets")[0];
            var refs = get_refs(datasets);

            var drops = new dataMenu();
            drops.build_list("#menu1", refs);

        },

    });

    return NetworkView;

});
