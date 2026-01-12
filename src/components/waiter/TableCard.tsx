import type { Table } from '../../models/Table';
import { TableStatus } from '../../models/Table';

interface TableCardProps {
  table: Table;
  isSelected: boolean;
  onSelect: (tableId: string) => void;
}

/**
 * Tarjeta de mesa individual
 */
export const TableCard = ({ table, isSelected, onSelect }: TableCardProps) => {
  const isOccupied = table.status === TableStatus.OCUPADA;

  return (
    <div
      onClick={() => onSelect(table.id)}
      className={`
        p-3 rounded-xl flex flex-col items-center justify-center gap-1 
        cursor-pointer transition-all
        ${
          isSelected
            ? 'glass-panel-dark border-primary/40'
            : 'bg-white/5 border border-white/5 hover:border-primary/30'
        }
      `}
    >
      <span
        className={`text-[10px] font-bold ${
          isSelected ? 'text-primary' : 'text-silver-text'
        }`}
      >
        {table.number}
      </span>
      <span
        className={`text-sm font-bold ${
          isSelected ? 'text-white-text' : 'text-silver-text'
        }`}
      >
        {isOccupied ? 'Ocupada' : 'Disponible'}
      </span>
      <div
        className={`w-1 h-1 rounded-full ${
          isSelected
            ? 'bg-primary shadow-[0_0_8px_#C5A059]'
            : isOccupied
            ? 'bg-primary/60'
            : 'bg-white/20'
        }`}
      />
    </div>
  );
};
