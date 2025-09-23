import { useState, useEffect, useCallback } from 'react';

interface SheetData {
  id: string;
  name: string;
  fatherName: string;
  email: string;
  payment: string;
}

export const useGoogleSheets = () => {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1oJZ8rM2MDrZlEJEgHLHLLTY8L8hrozBHdIVlxFTHNgk/export?format=csv';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(SHEET_URL, {
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const rows = csvText.split('\n').filter(row => row.trim() !== '');
      
      // Skip header row and parse data
      const parsedData: SheetData[] = rows.slice(1).map((row, index) => {
        // Handle CSV parsing with potential commas in quoted values
        const columns = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            columns.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        columns.push(current.trim()); // Add the last column
        
        // Clean up payment value - remove $ and quotes
        const paymentValue = columns[4] || '0';
        const cleanPayment = paymentValue.replace(/[$,"]/g, '').trim();
        
        return {
          id: columns[0] || `row-${index}`,
          name: columns[1] || '',
          fatherName: columns[2] || '', 
          email: columns[3] || '',
          payment: cleanPayment || '0'
        };
      }).filter(item => item.name || item.email); // Filter out empty rows
      
      setData(parsedData);
    } catch (err) {
      console.error('Error fetching Google Sheets data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      
      // Fallback demo data for development
      const demoData: SheetData[] = [
        { id: '1', name: 'John Doe', fatherName: 'Robert Doe', email: 'john@example.com', payment: '1250.00' },
        { id: '2', name: 'Jane Smith', fatherName: 'Michael Smith', email: 'jane@example.com', payment: '2300.50' },
        { id: '3', name: 'Bob Johnson', fatherName: 'William Johnson', email: 'bob@example.com', payment: '890.75' },
        { id: '4', name: 'Alice Brown', fatherName: 'David Brown', email: 'alice@example.com', payment: '1560.20' },
        { id: '5', name: 'Charlie Wilson', fatherName: 'James Wilson', email: 'charlie@example.com', payment: '3200.00' },
        { id: '6', name: 'Diana Martinez', fatherName: 'Carlos Martinez', email: 'diana@example.com', payment: '1750.80' },
        { id: '7', name: 'Eva Garcia', fatherName: 'Luis Garcia', email: 'eva@example.com', payment: '2100.40' },
        { id: '8', name: 'Frank Lee', fatherName: 'Kevin Lee', email: 'frank@example.com', payment: '980.60' }
      ];
      setData(demoData);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refreshData
  };
};