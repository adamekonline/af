import { useState, useEffect } from "react";
import { Transaction, Currency } from "@/types";
import { isWithinInterval, parseISO } from "date-fns";

export const useFilters = (transactions: Transaction[]) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPerson, setSelectedPerson] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("PLN" as Currency);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...transactions];

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(t => {
        const transactionDate = parseISO(t.date);
        return isWithinInterval(transactionDate, { start: startDate, end: endDate });
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Person filter
    if (selectedPerson !== "All") {
      filtered = filtered.filter(t => t.person === selectedPerson);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, startDate, endDate, selectedCategory, selectedPerson, sortBy]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (startDate && endDate) count++;
    if (selectedCategory !== "all") count++;
    if (selectedPerson !== "All") count++;
    if (sortBy !== "date-desc") count++;
    if (displayCurrency !== "PLN") count++;
    return count;
  };

  return {
    startDate,
    endDate,
    selectedCategory,
    selectedPerson,
    sortBy,
    displayCurrency,
    filteredTransactions,
    setStartDate,
    setEndDate,
    setSelectedCategory,
    setSelectedPerson,
    setSortBy,
    setDisplayCurrency,
    getActiveFiltersCount,
  };
};