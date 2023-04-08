import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

import {filter} from '../assets';

const {height, width} = Dimensions.get('window');

const TransactionPage = ({navigation}) => {
  const [transactionType, setTransactionType] = useState('Deposit');
  const [timePeriod, setTimePeriod] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  // Sample transaction data

  const transactions = [
    {
      id: '1',
      type: 'Deposit',
      amount: 100,
      date: new Date('2023-02-20T12:30:00Z'),
    },
    {
      id: '2',
      type: 'Send',
      amount: 50,
      date: new Date('2022-02-08T08:15:00Z'),
    },
    {
      id: '3',
      type: 'Deposit',
      amount: 75,
      date: new Date('2023-02-05T16:45:00Z'),
    },
    {
      id: '4',
      type: 'Send',
      amount: 20,
      date: new Date('2022-02-03T09:00:00Z'),
    },
    {
      id: '5',
      type: 'Deposit',
      amount: 150,
      date: new Date('2022-01-30T14:20:00Z'),
    },
    {
      id: '6',
      type: 'Deposit',
      amount: 345,
      date: new Date('2030-01-30T14:20:00Z'),
    },
    {
      id: '7',
      type: 'Send',
      amount: 786,
      date: new Date('2011-01-30T14:20:00Z'),
    },
    {
      id: '8',
      type: 'Deposit',
      amount: 150,
      date: new Date('2023-01-10T14:20:00Z'),
    },
    {
      id: '9',
      type: 'Send',
      amount: 150,
      date: new Date('2023-02-20T14:20:00Z'),
    },
    {
      id: '10',
      type: 'Send',
      amount: 150,
      date: new Date('2023-01-30T14:20:00Z'),
    },
    {
      id: '11',
      type: 'Deposit',
      amount: 150,
      date: new Date('2023-01-10T14:20:00Z'),
    },
    {
      id: '12',
      type: 'Deposit',
      amount: 150,
      date: new Date('2023-01-10T14:20:00Z'),
    },
    {
      id: '13',
      type: 'Deposit',
      amount: 150,
      date: new Date('2023-01-10T14:20:00Z'),
    },
    {
      id: '14',
      type: 'Send',
      amount: 150,
      date: new Date('2023-04-06T14:20:00Z'),
    },
    {
      id: '15',
      type: 'Deposit',
      amount: 150,
      date: new Date('2023-04-05T14:20:00Z'),
    },
  ];
  const filteredTransactions = transactions.filter(
    transaction => transaction.type === transactionType,
  );

  let timeFilteredTransactions = filteredTransactions;

  const today = new Date();
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate(),
  );

  if (timePeriod === 'recent') {
    timeFilteredTransactions = filteredTransactions.filter(
      transaction => transaction.date >= oneWeekAgo,
    );
  } else if (timePeriod === '2month') {
    timeFilteredTransactions = filteredTransactions.filter(
      transaction => transaction.date >= oneMonthAgo,
    );
  } else if (timePeriod === 'All') {
    timeFilteredTransactions = transactions.filter(
      transaction =>
        transaction.type === 'Deposit' || transaction.type === 'Send',
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            transactionType === 'Deposit' && styles.selectedButton,
          ]}
          onPress={() => setTransactionType('Deposit')}>
          <Text
            style={[
              styles.buttonText,
              transactionType === 'Deposit' && styles.selectedButton,
            ]}>
            입금
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            transactionType === 'Send' && styles.selectedButton,
          ]}
          onPress={() => setTransactionType('Send')}>
          <Text
            style={[
              styles.buttonText,
              transactionType === 'Send' && styles.selectedButton,
            ]}>
            출금
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#F7F6FF',
          height: 40,
          width: width * 0.9,
          borderRadius: 999,
        }}>
        <TouchableOpacity
          style={[
            styles.timeButton,
            timePeriod === '1month' && styles.selectedTimeButtonText,
          ]}
          onPress={() => setTimePeriod('1month')}>
          <Text
            style={[
              styles.timeButtonText,
              timePeriod === '1month' && styles.selectedTimeButtonText,
            ]}>
            1month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeButton, timePeriod === 'All']}
          onPress={() => setTimePeriod('All')}>
          <Text
            style={[
              styles.timeButtonText,
              timePeriod === 'All' && styles.selectedTimeButtonText,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeButton,
            timePeriod === 'recent' && styles.selectedTimeButtonText,
          ]}
          onPress={() => setTimePeriod('recent')}>
          <Text
            style={[
              styles.timeButtonText,
              timePeriod === 'recent' && styles.selectedTimeButtonText,
            ]}>
            recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={filter} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>
      {timeFilteredTransactions.length > 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ScrollView horizontal={true}>
              <FlatList
                data={timeFilteredTransactions}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View
                    style={{
                      height: 70,
                      width: width * 0.9,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomColor: '#F7F6FF',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: '#313131',
                        marginLeft: 24,
                      }}>
                      {item.type}
                    </Text>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginRight: 24,
                      }}>
                      <Text
                        style={{
                          fontWeight: 400,
                          color: '#A3ADB2',
                          fontSize: 12,
                        }}>
                        {item.date.toLocaleDateString()}
                      </Text>
                      <Text
                        style={{
                          color:
                            item.type === 'Deposit' ? '#7A60FF' : '#F94946',
                          textAlign: 'left',
                          verticalAlign: 'auto',
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        ${item.amount.toFixed(2)}STB
                      </Text>
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.noTransactionsContainer}>
          <Text style={styles.noTransactionsText}>No transactions found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,

    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 2,
    width: '50%',
  },
  selectedButton: {
    borderBottomColor: '#7A60FF',
    color: '#333',
  },
  text: {
    color: '#333',
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
  },

  selectedButtonText: {
    color: '#333',
  },
  selectedTimeButtonText: {
    color: '#7A60FF',
  },
  timeButton: {
    color: '#717585',
  },
  timeButtonText: {
    color: '#717585',
    fontSize: 12,
    fontWeight: 400,
  },

  noTransactionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#333',
  },
  textbold: {
    color: '#313131',
    fontFamily: 'Ionicons',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 100,
  },
});

export default TransactionPage;
