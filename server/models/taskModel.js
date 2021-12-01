const mongoose = require( 'mongoose' );

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description: {
        type: String,
        required : true,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false

    }
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Task = mongoose.model( 'tasks', TaskSchema );

const TaskModel = {
    createTask : function( newTask ){
        return Task.create( newTask );
    },
    getAllTasks : function( ){
        return Task.find().sort( { created_at: -1 } );
    },
    getTaskById : function( id ){
        return Task.findOne( { _id : id } );
    },
    getTaskByTitle : function( title ){
        return Task.findOne({ title });
    },

    updateTask : function( id, newTask ){
        return Task.updateOne( { _id : id }, newTask );
    },
    updateTask02: function( id, newTask ){
        return Task.findOneAndUpdate( { _id : id },{ $set:newTask }, { new:true } )
    },
    destroyTask : function( id ){
        return Task.deleteOne({ _id : id });
    }
};

module.exports = {TaskModel};