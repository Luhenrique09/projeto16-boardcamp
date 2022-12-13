import express from "express";
import categoriesRoutes from "./Routes/categories.routes.js";
import gamesRoutes from "./Routes/games.routes.js";
import customerRoutes from "./Routes/customers.routes.js";
import rentalsRoutes from "./Routes/rentals.routes.js";

const app = express();

app.use(express.json());
app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customerRoutes);
app.use(rentalsRoutes);
 
const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Server running in port: ${port}`));