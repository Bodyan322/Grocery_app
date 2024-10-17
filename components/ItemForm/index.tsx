import React, {useEffect, useImperativeHandle, useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader, ButtonSpinner
} from "@gluestack-ui/themed";
import { createGrocery, editGrocery, IGrocery } from "../../api";

interface IProps {
  item?: IGrocery,
  onClose: () => void;
}

const AddItemForm = ({ item, onClose }:IProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient();
const handleResetFields = () => {
  setName('');
  setAmount('');
  setError('');
}

  const { mutate: handleAddItem} = useMutation({
    mutationFn: async ({ name, amount }:{ name: string, amount: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return createGrocery(name, amount)
    },
    onSuccess: (data, variables, context) => {
      setLoading(false)
      onClose()
      handleResetFields();
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
    onError: (error, variables, context) => {
      console.log('onError')
    },
  })

  const { mutate: handleEditItem} = useMutation({
    mutationFn: async ({ id, name, amount }:{ id: string, name: string, amount: number }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return editGrocery(id, name, amount);
    },
    onSuccess: (data, variables, context) => {
      setLoading(false)
      onClose()
      handleResetFields();
      queryClient.invalidateQueries({ queryKey: ['groceries'] })
    },
    onError: (error, variables, context) => {
      setLoading(false)
      console.log('onError')
    },
  })
const handleAmountChange = (text: string) => {
  if (!isNaN(+text)) {
    setAmount(text)
  }
}
  const handleSubmit = () => {
    setLoading(true);
    setError('')
    if (!name || !amount) {
      setLoading(false)
      setError('Both fields are required');
      return;
    }

    const cachedGroceries = queryClient.getQueryData<IGrocery[]>(['groceries']);
    const isDuplicate = cachedGroceries?.some(item => item.name.toLowerCase() === name.toLowerCase());

    if (item && item.id) {
      handleEditItem({ id: item.id, name, amount: +amount });
    } else {
      handleAddItem({ name, amount: +amount })
    }
  };

  useEffect(() => {
    if(item) {
      setName(item.name);
      setAmount(item.amount.toString());
    }
  }, []);

  return (
  <ModalContent>
    <ModalHeader>
      <Heading size="lg">{item ? 'Edit Item' : 'Add Item'}</Heading>
      <ModalCloseButton>
        <Icon as={CloseIcon} />
      </ModalCloseButton>
    </ModalHeader>
    <ModalBody>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, (!name && error) ? styles.inputError : null, loading && !error && styles.disabled]}
          placeholder="Item name"
          value={name}
          editable={!loading}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, (!amount && error) ? styles.inputError : null, loading && !error && styles.disabled]}
          placeholder="Amount"
          value={amount}
          editable={!loading}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />
      </View>
    </ModalBody>
    <ModalFooter>
      <Button
        variant="outline"
        size="sm"
        action="secondary"
        mr="$3"
        onPress={onClose}
      >
        <ButtonText>Cancel</ButtonText>
      </Button>
      <Button
        size="sm"
        action="positive"
        borderWidth="$0"
        disabled={loading}
        onPress={handleSubmit}
      >
        {loading && !error && <ButtonSpinner mr="$1" />}
         <ButtonText>Save</ButtonText>
      </Button>
    </ModalFooter>
  </ModalContent>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,

  },
  inputError: {
    borderColor: 'red',
  },
  disabled: {
    backgroundColor: '#d3d3d3'
  }
});

export default AddItemForm;
