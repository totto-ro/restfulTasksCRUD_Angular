const express = require( 'express' );
const TaskRouter = express.Router();
const { TasksController } = require( '../controllers/tasksController' );

TaskRouter
    .get( '/', TasksController.retrieveAll );

TaskRouter
    .get( '/:id', TasksController.retrieveOne );

TaskRouter
.get( '/title/:title', TasksController.retrieveOneByTitle );

TaskRouter
    .post( '/new', TasksController.addOne );

TaskRouter
    .put( '/edit/:id', TasksController.updateOne );

TaskRouter
    .delete( '/remove/:id', TasksController.deleteOne );



module.exports = { TaskRouter };