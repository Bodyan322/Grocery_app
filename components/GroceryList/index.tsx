import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import { Plus } from 'lucide-react-native';
import { fetchGroceries } from "../../api";
import GroceryItem from "../GroceryItem";
import ItemForm from "../ItemForm";
import ModalWrapper from "../shared/ModalWrapper";

const GroceryList = () => {
  const { isLoading, data, error } = useQuery({ queryKey: ['groceries'], queryFn: fetchGroceries });
  const [isShowForm, setIsShowForm] = useState(false);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading groceries</Text>;

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box style={styles.container}>
          <Box style={styles.header}>
            <Text size='xl' bold style={styles.title}>Grocery List</Text>
              <TouchableOpacity onPress={() => setIsShowForm((p) => !p)}>
                <Box backgroundColor='#83BA77' borderRadius={20} padding={2}>
                  <Plus size={32} color='white' strokeWidth={3} />
                </Box>
              </TouchableOpacity>
          </Box>
          <VStack space='md'>
            {data?.map((item: any) => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </VStack>
          <ModalWrapper
            isModalOpen={isShowForm}
            onCloseModal={()=> setIsShowForm(p => !p)}>
            <ItemForm onClose={() => setIsShowForm(false)}/>
          </ModalWrapper>
        </Box>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  container: {
    paddingHorizontal: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    flex: 1,
    color: 'black'
  }
});

export default GroceryList;
