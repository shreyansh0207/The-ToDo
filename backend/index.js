const express  =  require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors")

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json())


app.post("/todo", async function(req,res){     //creating the todo
    const toCreateTodo = req.body;
    const theTodo = createTodo.safeParse(toCreateTodo);
    if(!theTodo.success){
        res.status(411).json({
            msg : "You send the wrong input"
        })
        return;
    }
    //to monoDB
    await todo.create({
        title : toCreateTodo.title,
        description : toCreateTodo.description,
        completed : false
    })
    res.json({
        msg : "Todo is created"
    })
 
})

app.get("/todos", async function(req,res){    //seeing the todo
  const todos = await todo.find({ })//this is will all the todos
  res.json({
    todos
  })
})


app.put("/completed", async function(req,res){   //mark as complete the todo
     const toUpdatetheTodo = req.body;
     const updateTheTodo = updateTodo.safeParse(toUpdatetheTodo)
     if(!updateTheTodo.success){
        res.status(411).json({
            msg  : "You send the wrong input"
        })
        return;
     }

     await todo.update({
        _id : req.body.id,
     } , {
        completed : true
     })
     res.json({
        msg  : "Todo marked as completed"
     })
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
