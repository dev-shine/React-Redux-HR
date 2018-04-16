
// import React from "react";
// import * as _ from "lodash";
// import Dialog from "material-ui/Dialog";
// import { notify } from "src/services/notify";
// import { getToken } from "src/services/generic";
// import { CONFIG } from "src/config/index";
// import style from "/home/etech/Documents/ReactReduxHR/src/styles/inventory/viewUser.scss";
// import Lightbox from "react-images";
// import FlatButton from 'material-ui/FlatButton';

// export default class DialogUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inventoryid: "",
//       user_token: "",
//       inventory_files: "inventory_files",
//       photoImage: "",
//       warrantyImage: "",
//       inoviceImage: ""
//     };
//   }
//   componentWillReceiveProps(props) {
//     this.setState({
//       user_token: getToken(),
//       photoImage: props.manageDevice.deviceHistory.fileInventoryPhoto,
//       warrantyImage: props.manageDevice.deviceHistory.fileInventoryWarranty,
//       inoviceImage: props.manageDevice.deviceHistory.fileInventoryInvoice
//     });
//   }
//   handleInlargePhoto() {
//     this.setState({
//       open: true,
//       open3: true,
//       open2: false,
//       open1: false
//     });
//   }
//   handleInlargeInovice() {
//     this.setState({
//       open: true,
//       open3: false,
//       open2: true,
//       open1: false
//     });
//   }
//   handleInlargeWarranty() {
//     this.setState({
//       open: true,
//       open3: false,
//       open2: false,
//       open1: true
//     });
//   }
//   handleClose = () => {
//     this.setState({ open: false });
//   };
//   render() {
//       const actions = [
//         <FlatButton
//           label="Close"
//           primary={true}
//           onClick={this.handleClose}
//         />,
//       ];

//     let path = CONFIG.view_inventory_documents;
//     let page_url = window.location.href;
//     return (
//       <div>
//         <h2>Inventory Files</h2>
//         <form
//           action={CONFIG.inventory_upload_url}
//           method="POST"
//           encType="multipart/form-data"
//         >
//           <input type="hidden" name="token" value={this.state.user_token} />
//           <input
//             type="hidden"
//             name="inventory_id"
//             value={this.props.inventory_id}
//           />
//           <input
//             type="hidden"
//             name="file_upload_action"
//             value={this.state.inventory_files}
//           />
//           <input type="hidden" name="page_url" value={page_url} />
//           <div className="form-group">
//             {this.state.photoImage ? (
//               <div>
//                 <img
//                   src={path + this.state.photoImage}
//                   onClick={() => {
//                     this.handleInlargePhoto();
//                   }}
//                   className="small"
//                 />
//                 <br />
//               </div>
//             ) : null}
//             <Dialog
//              actions={actions}
//               modal={false}
//               open={this.state.open && this.state.open3}
//               onRequestClose={this.handleClose}
//             >
//               <img src={path + this.state.photoImage} />
//             </Dialog>

//             <label>Photo</label>
//             <input
//               type="file"
//               className="form-control"
//               ref="file"
//               name="inventory_photo"
//             />
//           </div>
//           <div className="form-group">
//             {this.state.inoviceImage ? (
//               <div>
//                 {" "}
//                 <img
//                   src={path + this.state.inoviceImage}
//                   onClick={() => {
//                     this.handleInlargeInovice();
//                   }}
//                   className="small"
//                 />
//                 <br />
//               </div>
//             ) : null}
//             <Dialog
//              actions={actions}
//               modal={false}
//               open={this.state.open && this.state.open2}
//               onRequestClose={this.handleClose}
//             >
//               <img src={path + this.state.inoviceImage} />
//             </Dialog>

//             <label>Invoice</label>
//             <input
//               type="file"
//               className="form-control"
//               ref="file"
//               name="inventory_invoice"
//             />
//           </div>
//           <div className="form-group">
//             {this.state.warrantyImage ? (
//               <div>
//                 {" "}
//                 <img
//                   src={path + this.state.warrantyImage}
//                   onClick={() => {
//                     this.handleInlargeWarranty();
//                   }}
//                   className="small"
//                 />
//                 <br />
//               </div>
//             ) : null}
//             <Dialog
//              actions={actions}
//               modal={false}
//               open={this.state.open && this.state.open1}
//               onRequestClose={this.handleClose}
//             >
//               <img src={path + this.state.warrantyImage} />
//             </Dialog>
//             <label>Warranty</label>
//             <input
//               type="file"
//               className="form-control"
//               ref="file"
//               name="inventory_warranty"
//             />
//           </div>
//           <input
//             type="submit"
//             name="submit"
//             value="Upload"
//             className="col-xs-12 md-btn md-raised indigo"
//           />
//         </form>
//       </div>
//     );
//   }
// }
