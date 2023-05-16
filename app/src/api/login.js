// import connection from "./connection";
// const ProductsRoute = (routematch) => {
//   switch (routematch.route) {
//     case "allProducts":
//       return "/products";
//     case "categoriesListProduct":
//       return `/products?page=${routematch.page}&limit=${routematch.limit}&category=${routematch.id}`;
//     case "categoriesProductSearch":
//       return `/products?search=${routematch.search}&&category=${routematch.id}`;
//     case "categoriesAllSearch":
//       return `/products?search=${routematch.search}`;
//     case "categoriesProducts":
//       return `/products?page=${routematch.page}&limit=${routematch.limit}`;
//   }
// };
// export const GetCategoryListApi = () => {
//   return connection.get("/products/categories");
// };
// export const AllproductLists = () => {
//   return connection.get("/products");
// };

// export const AllProductApi = (routeMatch) => {
//   return connection.get(ProductsRoute(routeMatch));
// };

// export const AllProductShowApi = (id) => {
//   return connection.get(`/products/${id}`);
// };

// export const AddFavProduct = (id, body) => {
//   return connection.put(`/products/${id}/favourites`, body);
// };

// export const RemoveFavProduct = (id) => {
//   return connection.put(`/products/${id}/un-favourite`);
// };

// export const FavProducts = () => {
//   return connection.get("/products/favourites");
// };

// export const ProductsCategoriesList = (id) => {
//   return connection.get(`/products?page=1&limit=25&category=${id}&search=""`);
// };

// export const FetchPaymentSheetParams = (body) => {
//   return connection.post("/payment-sheet");
// };

// export const ValidateBarCode = (body) => {
//   return connection.put("/kit/validate", body);
// };

// export const Subscriptions = (body) => {
//   return connection.get("/subscriptions");
// };

// export const CreateCustomer = (body) => {
//   return connection.get("/subscriptions/add-user");
// };

// export const createOfflineSubs = (body) => {
//   return connection.post("/subscriptions", body);
// };

// export const CreateStripeSession = (body) => {
//   return connection.put("/subscriptions/setup-session", body);
// };

// export const CreateOfflineSubscription = (body) => {
//   return connection.post("/subscriptions/offline", body);
// };
