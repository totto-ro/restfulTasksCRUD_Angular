const {TaskModel} = require( '../models/taskModel' );

const TasksController = {
    retrieveAll : function( request, response ){
        TaskModel.getAllTasks()
            .then( data =>{
                response.status( 200 ).json( data );
            });
    },

    addOne : function( request, response ){
        let { title, description, completed } = request.body;

        if( title && description ){
            let newTask = {
                title,
                description,
                completed
            };
            TaskModel
                .createTask( newTask )
                .then ( result => {
                    response.status( 201 ).json( result );
                });
        }
        else{
            response.statusMessage = "You are missing a field ( 'title', 'description' )";
            response.status( 406 ).end();
        }
    },

    deleteOne : function( request, response ){
        let id = request.params.id;

        TaskModel
            .getTaskById( id )
            .then( data => {
                if( data === null ){
                    throw new Error( "That task doesn't exist" );
                }
                else{
                    TaskModel
                        .destroyTask( id )
                        .then( result => {
                            response.status( 204 ).end();
                        });
                }
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })
    },

    retrieveOneByTitle: function( request, response ){
        let title = request.params.title;

        TaskModel
        .getTaskByTitle( title )
                .then( data => {
                    if( data === null ){
                        throw new Error( "That task doesn't exist" );
                    }
                    else{
                        TaskModel
                            .getTaskByTitle( title )
                            .then( result => {
                                response.status( 200 ).json( result );
                            });
                    }
                })
                .catch( error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                })
    },


    retrieveOne : function( request, response ){
        let id = request.params.id;

        TaskModel
        .getTaskById( id )
                .then( data => {
                    if( data === null ){
                        throw new Error( "That task doesn't exist" );
                    }
                    else{
                        TaskModel
                            .getTaskById( id )
                            .then( result => {
                                response.status( 200 ).json( result );
                            });
                    }
                })
                .catch( error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                })
    },

    updateOne : function( request, response ){
        let title = request.body.title;
        let description = request.body.description;
        let completed = request.body.completed;
        let id = request.params.id;

        let fieldsToUpdate = {
            title,
            description,
            completed
        };

        if( title ){
            fieldsToUpdate.title = title;
        }

        if( description ){
            fieldsToUpdate.description = description;
        }

        if( completed ){
            fieldsToUpdate.completed = completed;
        }
        
        if( Object.keys( fieldsToUpdate ).length === 0 ){
            response.statusMessage = "You need to provide at least one of the following fields to update the task ('title', 'description', 'completed')";
            response.status( 406 ).end();
        }
        else{
            TaskModel
                .getTaskById( id )
                .then( data => {
                    if( data === null ){
                        throw new Error( "That task doesn't exist" );
                    }
                    else{
                        TaskModel
                            .updateTask02( id, fieldsToUpdate )
                            .then( result => {
                                response.status( 202 ).json( result );
                            });
                    }
                })
                .catch( error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                })

        }
    }
}

module.exports = {TasksController};