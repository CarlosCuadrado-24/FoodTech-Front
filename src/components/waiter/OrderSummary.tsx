import type { OrderProduct } from '../../models/Product';

interface OrderSummaryProps {
  products: OrderProduct[];
  totalItems: number;
  isSubmitting: boolean;
  onRemoveProduct: (productName: string) => void;
  onSubmit: () => void;
}

/**
 * Panel lateral con resumen del pedido
 */
export const OrderSummary = ({
  products,
  totalItems,
  isSubmitting,
  onRemoveProduct,
  onSubmit,
}: OrderSummaryProps) => {
  const hasProducts = products.length > 0;

  return (
    <div data-testid="order-summary" className="p-8 border-b border-white/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white-text">Resumen de Orden</h3>
        {hasProducts && (
          <span data-testid="order-active-badge" className="bg-primary/10 text-primary text-[10px] px-3 py-1.5 rounded-full border border-primary/20 font-bold uppercase tracking-widest">
            Orden Activa
          </span>
        )}
      </div>

      {/* Lista de Productos */}
      {hasProducts ? (
        <>
          <div data-testid="order-products-list" className="space-y-6 max-h-[300px] overflow-y-auto order-scroll pr-4">
            {products.map((product) => (
              <div key={product.name} className="flex justify-between items-start group">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white-text font-bold">
                      {product.name}
                    </span>
                    <span className="text-primary text-sm font-bold">
                      x{product.quantity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveProduct(product.name)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-silver-text hover:text-primary"
                >
                  <span className="material-symbols-outlined text-lg">
                    remove_circle
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Total Items */}
          <div data-testid="order-total" className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-white-text font-bold">Total de Items:</span>
              <span data-testid="total-items-count" className="text-primary font-bold text-2xl">{totalItems}</span>
            </div>
          </div>

          {/* Botón Enviar */}
          <button
            data-testid="submit-order-btn"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full mt-8 py-5 gold-gradient hover:brightness-110 active:scale-[0.98] transition-all rounded-2xl text-xs font-black tracking-[0.2em] uppercase shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 text-midnight disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined font-bold animate-spin">
                  refresh
                </span>
                Enviando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined font-bold">
                  send
                </span>
                Enviar a Cocina
              </>
            )}
          </button>
        </>
      ) : (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-silver-text/30 mb-4 block">
            shopping_cart
          </span>
          <p className="text-silver-text text-sm">
            Selecciona productos para crear un pedido
          </p>
        </div>
      )}
    </div>
  );
};
