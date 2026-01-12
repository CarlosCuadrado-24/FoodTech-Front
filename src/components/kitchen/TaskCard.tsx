import type { Task } from '../../models/Task';
import { TaskStatus } from '../../models/Task';
import { ProductType } from '../../models/Product';

interface TaskCardProps {
  task: Task;
  onStartPreparation: (taskId: number) => void;
  isStarting?: boolean;
}

export function TaskCard({ task, onStartPreparation, isStarting = false }: TaskCardProps) {
  const getStatusStyles = () => {
    switch (task.status) {
      case TaskStatus.PENDING:
        return 'border-amber-glow/40 bg-amber-glow/5';
      case TaskStatus.IN_PREPARATION:
        return 'border-primary/40 ring-1 ring-primary/20';
      case TaskStatus.COMPLETED:
        return 'border-green-500/40 bg-green-500/5';
      default:
        return 'border-white/10';
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case TaskStatus.PENDING:
        return { label: 'Pendiente', color: 'text-amber-glow' };
      case TaskStatus.IN_PREPARATION:
        return { label: 'En Preparación', color: 'text-primary' };
      case TaskStatus.COMPLETED:
        return { label: 'Completada', color: 'text-green-400' };
      default:
        return { label: task.status, color: 'text-silver-text' };
    }
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case ProductType.DRINK:
        return 'local_bar';
      case ProductType.HOT_DISH:
        return 'local_fire_department';
      case ProductType.COLD_DISH:
        return 'ac_unit';
      default:
        return 'restaurant';
    }
  };

  const statusBadge = getStatusBadge();
  const canStart = task.status === TaskStatus.PENDING;

  return (
    <div className={`glass-panel-dark group p-4 rounded-2xl transition-all flex flex-col gap-4 ${getStatusStyles()}`}>
      {/* Header */}
      <div className="flex justify-between items-start px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white-text">Mesa {task.tableNumber}</h3>
            <span className={`text-xs font-bold uppercase tracking-wider ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
          <p className="text-xs text-silver-text">Pedido #{task.orderId}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
            <span className="text-xs font-bold text-white-text tabular-nums">
              {new Date(task.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="bg-white/5 rounded-xl p-4 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-silver-text mb-3">Productos</p>
        <div className="space-y-3">
          {task.products.map((product, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                  {getProductIcon(product.type)}
                </span>
                <p className="text-sm font-medium text-white-text">{product.name}</p>
              </div>
              <span className="text-xs text-silver-text">x{product.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      {canStart && (
        <button
          onClick={() => onStartPreparation(task.id)}
          disabled={isStarting}
          className="w-full py-3.5 amber-gradient rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 text-midnight shadow-lg hover:shadow-amber-glow/20 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          {isStarting ? 'Iniciando...' : 'Iniciar Preparación'}
        </button>
      )}

      {task.status === TaskStatus.IN_PREPARATION && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">info</span>
          <p className="text-[10px] text-primary font-medium">Se completará automáticamente</p>
        </div>
      )}
    </div>
  );
}
