import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartData = [
  { name: 'Q1', sales: 215000, color: '#FF6384', legendFontColor: '#333', legendFontSize: 14 },
  { name: 'Q2', sales: 280000, color: '#36A2EB', legendFontColor: '#333', legendFontSize: 14 },
  { name: 'Q3', sales: 527612, color: '#FFCE56', legendFontColor: '#333', legendFontSize: 14 },
  { name: 'Q4', sales: 853800, color: '#4BC0C0', legendFontColor: '#333', legendFontSize: 14 },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Projection</Text>
      <PieChart
        data={chartData.map(d => ({
          name: d.name,
          population: d.sales,
          color: d.color,
          legendFontColor: d.legendFontColor,
          legendFontSize: d.legendFontSize,
        }))}
        width={screenWidth - 40}
        height={240}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#222'
  }
});
