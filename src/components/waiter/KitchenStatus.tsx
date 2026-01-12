import type { Task } from '../../models/Task';
import { TaskStatus } from '../../models/Task';

interface KitchenStatusProps {
  tasks: Task[];
  isLoading: boolean;
  onRefresh: () => void;
}

/**
 * Panel con el estado de las tareas en cocina
 */
export const KitchenStatus = ({
  tasks,
  isLoading,
  onRefresh,
}: KitchenStatusProps) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'border-primary/30';
      case TaskStatus.IN_PREPARATION:
        return 'border-white/10';
      case TaskStatus.PENDING:
        return 'border-white/5 opacity-50';
      default:
        return 'border-white/5';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'Lista';
      case TaskStatus.IN_PREPARATION:
        return 'En Preparación';
      case TaskStatus.PENDING:
        return 'En Cola';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'check_circle';
      case TaskStatus.IN_PREPARATION:
        return 'schedule';
      case TaskStatus.PENDING:
        return 'pending';
      default:
        return 'help';
    }
  };

  return (
    <div className="flex-1 p-8 flex flex-col overflow-hidden bg-midnight/30">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-silver-text">
          Estado de Cocina
        </h4>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="text-primary text-sm cursor-pointer hover:rotate-180 transition-transform duration-500 disabled:opacity-50"
        >
          <span className="material-symbols-outlined">sync</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto order-scroll space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-silver-text/30 mb-4 block">
              kitchen
            </span>
            <p className="text-silver-text text-sm">
              No hay tareas en cocina
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 bg-white/5 border rounded-2xl ${getStatusColor(
                task.status
              )}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold text-sm">
                    Mesa {task.tableNumber}
                  </span>
                  <span className="text-silver-text text-[10px]">
                    #{task.orderId}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-sm ${
                      task.status === TaskStatus.COMPLETED
                        ? 'text-primary'
                        : 'text-silver-text'
                    }`}
                  >
                    {getStatusIcon(task.status)}
                  </span>
                  <span className="text-silver-text text-xs">
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {task.products.map((product, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white/5 px-2 py-1 rounded text-silver-text"
                  >
                    {product.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
