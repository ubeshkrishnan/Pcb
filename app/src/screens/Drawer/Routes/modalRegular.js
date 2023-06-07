import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ModalRegular({ visible,item,setcards }) {


  const [inputValues, setInputValues] = useState({
    serialno:"",
    companyname:"",
    taluk:"",
    village:"",
    sample:"",
    category:"",
    scheduletype:"",
    sampletype:"",
    
  });
  const navigation = useNavigation();
const {serialno,companyname,taluk,village,sample,category,scheduletype,sampletype} = inputValues
  const handleInputChange = (title,e) => {
    console.log(e,"ddd");
    setInputValues(prev => {
      return {...prev,[title] : e}
     })
  };
  

  const handleCancel = () => {
    setInputValues({});
    navigation.goBack(); // Dismisses the modal and goes back to the previous screen
  };

  const handleSave = () => {
    // Handle save logic here

    item.push(
      inputValues
    );
    setcards(item);
    console.log(item.length,"asdad");
    console.log(inputValues,"daaata")
  };

  return (
  
    <Modal visible={visible} animationType="slide" >
      <ScrollView>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.inputField}
          value={serialno}
          name="serialno"
          onChangeText={(e) => handleInputChange("serialno",e)}
          placeholder="Serial No"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          value={companyname}
          name="companyname"
          onChangeText={(e) => handleInputChange("companyname",e)}
          placeholder="Company name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          value={taluk}
          name="taluk"
          onChangeText={(e) => handleInputChange("taluk",e)}
          placeholder="Region/Taluk"
          placeholderTextColor="black"
        />
     <TextInput
          style={styles.inputField}
          value={village}
          name="village"
          onChangeText={(e) => handleInputChange("village", e)}
          placeholder="Village"
          placeholderTextColor="black"
        /> 
        <TextInput
          style={styles.inputField}
          value={sample}
          name="sample"
          onChangeText={(e) => handleInputChange("sample", e)}
          placeholder="No.of.Samples"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          value={category}
          name="category"
          onChangeText={(e) => handleInputChange("category",e)}
          placeholder="Category"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          value={scheduletype}
          name="scheduletype"
          onChangeText={(e) => handleInputChange("scheduletype", e)}
          placeholder="Schedule Type"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          value={sampletype}
          name="sampletype"
          onChangeText={(e) => handleInputChange("sampletype", e)}
          placeholder="Sample Type"
          placeholderTextColor="black"
        /> 

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonLabelSave}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonLabelCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Modal>
  
  );
}

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 200,
  },
  buttonLabelSave: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'green',
    width: 55,
    height:20,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 7,
  },
  buttonLabelCancel: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
    width: 54,
    height: 20,
    borderRadius: 10,
    marginTop: 10,
  },
};
