import { useState, useCallback } from 'react';
import type { Table } from '../models/Table';
import { TableStatus } from '../models/Table';

/**
 * Datos de mesas iniciales (simuladas)
 * En un caso real, esto vendría del backend
 */
const INITIAL_TABLES: Table[] = [
  { id: '1', number: 'A1', status: TableStatus.DISPONIBLE },
  { id: '2', number: 'A2', status: TableStatus.DISPONIBLE },
  { id: '3', number: 'A3', status: TableStatus.DISPONIBLE },
  { id: '4', number: 'A4', status: TableStatus.DISPONIBLE },
  { id: '5', number: 'B1', status: TableStatus.DISPONIBLE },
  { id: '6', number: 'B2', status: TableStatus.DISPONIBLE },
  { id: '7', number: 'B3', status: TableStatus.DISPONIBLE },
  { id: '8', number: 'B4', status: TableStatus.DISPONIBLE },
];

/**
 * Hook para gestionar mesas del restaurante
 */
export const useTables = () => {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const selectedTable = tables.find((table) => table.id === selectedTableId);

  const selectTable = useCallback((tableId: string) => {
    setSelectedTableId(tableId);
  }, []);

  const markTableAsOccupied = useCallback(
    (tableId: string, orderId: number) => {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === tableId
            ? {
                ...table,
                status: TableStatus.OCUPADA,
                activeOrderId: orderId,
              }
            : table
        )
      );
    },
    []
  );

  const markTableAsAvailable = useCallback((tableId: string) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: TableStatus.DISPONIBLE,
              activeOrderId: undefined,
            }
          : table
      )
    );
  }, []);

  return {
    tables,
    selectedTable,
    selectedTableId,
    selectTable,
    markTableAsOccupied,
    markTableAsAvailable,
  };
};
