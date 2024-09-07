import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Your service function to fetch employees
import { useDebounce } from 'use-debounce';

import { fetchEmployees } from '~/service';
import { type Employee, type Id } from '~/types/models/Employee';

export const PAGE_SIZE = 8;

const EmployeeScreen = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [debouncedSearch] = useDebounce(search, 500); // Debounce search input

	const calculateYearsOfExperience = (positions) => {
		return positions.reduce((total, position) => {
			return (
				total +
				position.toolLanguages.reduce((years, lang) => {
					return years + (lang.to - lang.from);
				}, 0)
			);
		}, 0);
	};

	const sortByExperience = useCallback((employeeList) => {
		return employeeList.sort((a, b) => {
			const experienceA = calculateYearsOfExperience(a.positions);
			const experienceB = calculateYearsOfExperience(b.positions);
			return experienceB - experienceA; // Sort in descending order
		});
	}, []);

	const loadEmployees = useCallback(
		async (searchTerm) => {
			setIsLoading(true);
			const response = await fetchEmployees(page, PAGE_SIZE, searchTerm);
			setEmployees((prev) => {
				return sortByExperience(
					searchTerm ? response.data.pageItems : [...new Set([...prev, ...response.data.pageItems])],
				);
			});
			setIsLoading(false);
		},
		[page, sortByExperience],
	);

	const deleteEmployee = (id: Id) => {
		setEmployees(
			employees.filter((emp) => {
				return emp.id !== id;
			}),
		);
	};

	const handleSearchChange = (value) => {
		setSearch(value);
	};

	useEffect(() => {
		void loadEmployees(debouncedSearch);
	}, [debouncedSearch, loadEmployees, page]);

	const renderEmployeeItem = ({ item }) => {
		return (
			<View style={styles.employeeCard}>
				<FlatList
					horizontal
					data={item.positions[0]?.toolLanguages[0]?.images || []}
					keyExtractor={(image) => {
						return image.id.toString();
					}}
					renderItem={({ item: image }) => {
						return (
							<Image
								source={{
									uri: image.cdnUrl,
								}}
								style={styles.image}
							/>
						);
					}}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.years}>{calculateYearsOfExperience(item.positions)} years</Text>
				</View>
				<Text style={styles.position}>{item.positions[0]?.name}</Text>
				<Text style={styles.description}>{item.positions[0]?.toolLanguages[0]?.description}</Text>
				<TouchableOpacity
					style={styles.deleteBtn}
					onPress={() => {
						deleteEmployee(item.id);
					}}
				>
					<Text style={styles.deleteText}>Delete</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>List Employees</Text>
			<TextInput style={styles.searchInput} placeholder="Search name..." onChangeText={handleSearchChange} />
			{isLoading && <ActivityIndicator size="large" color="#0000ff" />}
			<FlatList
				data={employees}
				keyExtractor={(item) => {
					return item.id.toString();
				}}
				renderItem={renderEmployeeItem}
				onEndReached={() => {
					setPage(page + 1);
				}}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isLoading && <ActivityIndicator size="small" color="#0000ff" />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	label: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 8,
		marginBottom: 10,
		borderRadius: 5,
	},
	employeeCard: {
		padding: 16,
		marginBottom: 16,
		backgroundColor: '#fff',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		elevation: 2,
	},
	image: {
		width: 100,
		height: 100,
		marginRight: 10,
	},
	cardContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	years: {
		fontSize: 14,
		color: '#888',
	},
	position: {
		marginTop: 5,
		fontSize: 14,
		color: '#555',
	},
	description: {
		marginTop: 5,
		fontSize: 12,
		color: '#777',
	},
	deleteBtn: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#ff4d4f',
		borderRadius: 5,
	},
	deleteText: {
		color: '#fff',
		textAlign: 'center',
	},
});

export default EmployeeScreen;
