// import React, { Component } from "react";
// import "./PersonalInfo.css";
// import axios from "axios";
// import PersonalInfoTable from "./PersonalInfoTable.jsx";
// import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";
// class PersonalInfo extends Component {
//   state = {
//     table: true,
//     editForm: false,
//     editData: {},
//     addFormGender: "",
//     editFormGender: ""
//   };

//   render() {
//     return (
//       <React.Fragment>
//         {this.state.table ? (
//           this.state.editForm ? (
//             <PersonalInfoFormEdit
//               onPersonalInfoEditUpdate={this.handlePersonalInfoEditUpdate}
//               onFormEditClose={this.handleEditFormClose}
//               editData={this.state.editData}
//               onGenderChange={this.handleEditFormGenderChange}
//             />
//           ) : (
//             <PersonalInfoTable
//               onAddPersonalInfo={this.handleAddPersonalInfo}
//               onEditPersonalInfo={this.handleEditPersonalInfo}
//               data={this.props.data}
//               back={this.props.back}
//             />
//           )
//         ) : (
//           <div />
//         )}
//       </React.Fragment>
//     );
//   }
//   handleEditPersonalInfo = (e) => {
//     console.log(e);
//     console.log("clicked6");
//     this.setState({ editForm: true });
//     this.setState({ editData: e });
//     this.setState({ editFormGender: e["Gender"] });
//   };
//   handleEditFormClose = () => {
//     console.log("clicked5");
//     this.setState({ editForm: false });
//   };
//   handlePersonalInfoEditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//     console.log("zero data", newInfo.target[0].value);
//     let body = {
//       Gender: this.state.editFormGender,
//       ContactNo: newInfo.target[5].value,
//       EmergencyContactNo: newInfo.target[6].value,
//       Email: newInfo.target[7].value,
//       PANcardNo: newInfo.target[8].value,
//       DOB: newInfo.target[9].value,
//       BloodGroup: newInfo.target[10].value,
//       Hobbies: newInfo.target[11].value,
//       PresentAddress: newInfo.target[12].value,
//       PermanetAddress: newInfo.target[13].value
//     };
//     console.log("update", body);
//     axios
//       .put("http://localhost:4000/api/personal-info/" + info["_id"], body, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((res) => {
//         this.setState({ table: false });
//         this.setState({ table: true });
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     this.setState({ editForm: false });
//   };
//   handleEditFormGenderChange = (e) => {
//     // console.log(e.currentTarget.value);
//     // console.log("ggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnn")
//     this.setState({
//       editFormGender: e.currentTarget.value
//     });
//   };
// }

// export default PersonalInfo;

import React, { useState } from "react";
import axios from "axios";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";
import "./PersonalInfo.css";


const PersonalInfo = ({ data, back }) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [editFormGender, setEditFormGender] = useState("");

  const handleEditPersonalInfo = (e) => {
    console.log(e);
    console.log("clicked6");
    setEditForm(true);
    setEditData(e);
    setEditFormGender(e["Gender"]);
  };

  const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false);
  };

  const handlePersonalInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    const body = {
      Gender: editFormGender,
      ContactNo: newInfo.target[5].value,
      EmergencyContactNo: newInfo.target[6].value,
      Email: newInfo.target[7].value,
      PANcardNo: newInfo.target[8].value,
      DOB: newInfo.target[9].value,
      BloodGroup: newInfo.target[10].value,
      Hobbies: newInfo.target[11].value,
      PresentAddress: newInfo.target[12].value,
      PermanetAddress: newInfo.target[13].value,
      presonalEmail: newInfo.target[14].value
    };
    console.log("update", body);
    axios
      .put(`http://localhost:4000/api/personal-info/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditForm(false);
  };

  const handleEditFormGenderChange = (e) => {
    setEditFormGender(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <PersonalInfoFormEdit
            onPersonalInfoEditUpdate={handlePersonalInfoEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
            onGenderChange={handleEditFormGenderChange}
          />
        ) : (
          <PersonalInfoTable
            onAddPersonalInfo={handleEditPersonalInfo}
            onEditPersonalInfo={handleEditPersonalInfo}
            data={data}
            back={back}
          />
        )
      ) : (
        <div />
      )}
    </React.Fragment>
  );
};

export default PersonalInfo;
