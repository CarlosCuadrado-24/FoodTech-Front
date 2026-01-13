# 🍽️ Vistas de Estaciones - Documentación Técnica

## 📋 Resumen

Implementación de las vistas para las 3 estaciones de cocina del sistema FoodTech, siguiendo el diseño **Midnight Gold** y las historias de usuario HU-002 y HU-003.

---

## 🏗️ Arquitectura

### Principios Aplicados

✅ **Single Responsibility Principle**
- Cada componente tiene una única responsabilidad claramente definida
- TaskCard: renderizar una tarjeta de tarea
- TaskList: organizar el grid de tareas
- TaskStatusFilter: manejar filtros de estado
- StationLayout: proporcionar layout común

✅ **DRY (Don't Repeat Yourself)**
- 3 estaciones reutilizan los mismos 4 componentes
- Hook único `useStationTasks` para toda la lógica de negocio
- Layout compartido para consistencia visual

✅ **Separation of Concerns**
- Componentes: presentación pura
- Hook: lógica de negocio y estado
- Services: comunicación con API
- Views: orquestación

---

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── kitchen/
│   │   ├── TaskCard.tsx          # Tarjeta individual de tarea (120 líneas)
│   │   ├── TaskList.tsx          # Grid de tareas (35 líneas)
│   │   ├── TaskStatusFilter.tsx  # Filtros de estado (40 líneas)
│   │   └── StationLayout.tsx     # Layout común (50 líneas)
│   └── Navigation.tsx             # Barra de navegación (45 líneas)
├── hooks/
│   └── useStationTasks.ts        # Hook de estado y polling (80 líneas)
├── views/
│   ├── HotKitchenView.tsx        # Vista cocina caliente (60 líneas)
│   ├── BarView.tsx               # Vista barra (60 líneas)
│   └── ColdKitchenView.tsx       # Vista cocina fría (60 líneas)
└── App.tsx                        # Routing principal
```

---

## 🎨 Componentes

### 1. TaskCard

**Responsabilidad:** Renderizar una tarjeta de tarea con toda su información

**Props:**
```typescript
interface TaskCardProps {
  task: Task;
  onStartPreparation: (taskId: number) => void;
  isStarting?: boolean;
}
```

**Features:**
- Diseño adaptativo según estado (PENDING/IN_PREPARATION/COMPLETED)
- Iconos Material Symbols para tipos de producto
- Botón "Iniciar Preparación" solo para tareas pendientes
- Loading state individual por tarea
- Timestamps formateados en español

**Estados visuales:**
- **Pendiente:** Border amber + fondo amber/5
- **En Preparación:** Border primary + ring dorado
- **Completada:** Border verde + fondo verde/5

---

### 2. TaskList

**Responsabilidad:** Organizar tareas en grid responsive

**Props:**
```typescript
interface TaskListProps {
  tasks: Task[];
  onStartPreparation: (taskId: number) => void;
  startingTaskId: number | null;
  emptyMessage?: string;
}
```

**Features:**
- Grid responsive: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Empty state elegante con ícono y mensaje personalizable
- Propagación de callbacks a TaskCard
- Manejo de loading state por tarea individual

---

### 3. TaskStatusFilter

**Responsabilidad:** Filtrar tareas por estado

**Props:**
```typescript
interface TaskStatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  taskCounts: {
    all: number;
    pending: number;
    inPreparation: number;
    completed: number;
  };
}
```

**Features:**
- 4 filtros: Todas / Pendientes / En Preparación / Completadas
- Botón activo con gold-gradient
- Scroll horizontal en mobile
- Contadores en tiempo real

---

### 4. StationLayout

**Responsabilidad:** Layout común con sidebar y header

**Props:**
```typescript
interface StationLayoutProps {
  stationName: string;
  stationCode: string;
  icon: string;
  children: ReactNode;
}
```

**Features:**
- Sidebar con icono de estación
- Header con nombre, código y reloj en tiempo real
- Dark theme Midnight Gold
- Responsive: sidebar se mantiene en desktop, oculto en mobile

---

## 🔌 Hook: useStationTasks

**Responsabilidad:** Manejar estado y lógica de negocio para una estación

### Estado Manejado

```typescript
{
  tasks: Task[];              // Tareas filtradas
  selectedStatus: string;     // Filtro activo
  loading: boolean;           // Estado de carga
  error: string | null;       // Errores
  startingTaskId: number | null; // Tarea iniciándose
  taskCounts: {              // Contadores por estado
    all: number;
    pending: number;
    inPreparation: number;
    completed: number;
  }
}
```

### Funcionalidades

#### 1. Polling Automático
```typescript
useEffect(() => {
  fetchTasks();
  const intervalId = setInterval(fetchTasks, pollingInterval);
  return () => clearInterval(intervalId);
}, [fetchTasks, pollingInterval]);
```

- Actualiza cada 5 segundos por defecto
- Cleanup automático al desmontar
- Configurable vía parámetro

#### 2. Filtrado Reactivo
```typescript
useEffect(() => {
  if (selectedStatus === 'ALL') {
    setFilteredTasks(tasks);
  } else {
    setFilteredTasks(tasks.filter(task => task.status === selectedStatus));
  }
}, [tasks, selectedStatus]);
```

- Filtra en frontend (mejor UX)
- Recalcula automáticamente cuando cambian tareas o filtro

#### 3. Iniciar Preparación
```typescript
const startTaskPreparation = async (taskId: number) => {
  setStartingTaskId(taskId);  // Loading individual
  await taskService.startTask(taskId);
  await fetchTasks();         // Refrescar inmediatamente
  setStartingTaskId(null);
};
```

- Loading state por tarea específica
- Refresh automático post-acción
- Manejo de errores

---

## 🎨 Diseño: Midnight Gold Theme

### Paleta de Colores

```javascript
colors: {
  primary: '#C5A059',         // Dorado principal
  champagne: '#E8D3A3',       // Dorado claro
  midnight: '#0A0A0B',        // Fondo oscuro
  charcoal: '#161618',        // Cards y paneles
  'charcoal-light': '#1F1F22',
  'amber-glow': '#FFBF00',    // Tareas pendientes
  'silver-text': '#A1A1AA',   // Texto secundario
  'white-text': '#F4F4F5',    // Texto principal
}
```

### Gradientes

```css
.gold-gradient {
  background: linear-gradient(135deg, #C5A059 0%, #E8D3A3 100%);
}

.amber-gradient {
  background: linear-gradient(135deg, #FFBF00 0%, #FFA000 100%);
}

.green-gradient {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}
```

### Tipografía

- **Fuente:** Space Grotesk (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700
- **Iconos:** Material Symbols Outlined

---

## 🚀 Routing

### Configuración

```typescript
<BrowserRouter>
  <Navigation />
  <div className="pt-16"> {/* Offset por navbar fija */}
    <Routes>
      <Route path="/" element={<Navigate to="/mesero" replace />} />
      <Route path="/mesero" element={<WaiterView />} />
      <Route path="/cocina-caliente" element={<HotKitchenView />} />
      <Route path="/barra" element={<BarView />} />
      <Route path="/cocina-fria" element={<ColdKitchenView />} />
    </Routes>
  </div>
</BrowserRouter>
```

### Rutas

| Ruta | Vista | Estación |
|------|-------|----------|
| `/` | Redirect | → `/mesero` |
| `/mesero` | WaiterView | - |
| `/cocina-caliente` | HotKitchenView | HOT_KITCHEN |
| `/barra` | BarView | BAR |
| `/cocina-fria` | ColdKitchenView | COLD_KITCHEN |

---

## 📊 Flujo de Datos

```
Usuario selecciona filtro
    ↓
setSelectedStatus('PENDING')
    ↓
useEffect detecta cambio
    ↓
Filtra tasks localmente
    ↓
setFilteredTasks([...])
    ↓
Re-render automático
    ↓
TaskList recibe tareas filtradas
```

### Polling Flow

```
Componente monta
    ↓
useEffect inicia
    ↓
fetchTasks() llamada inicial
    ↓
setInterval(fetchTasks, 5000)
    ↓
Cada 5s: GET /api/tasks/station/{station}
    ↓
setTasks(response)
    ↓
useEffect filtrado se dispara
    ↓
UI actualizada
    ↓
Componente desmonta → clearInterval()
```

---

## ✅ Historias de Usuario Implementadas

### HU-002: Consultar tareas por estación ✅

**Criterios cumplidos:**
- ✅ Cada estación ve solo sus tareas
- ✅ Información completa: mesa, productos, timestamps
- ✅ Actualización automática (polling)
- ✅ Validación de estación (via TypeScript)

### HU-003: Ejecutar tarea de preparación ✅

**Criterios cumplidos:**
- ✅ Botón "Iniciar Preparación" solo en tareas PENDING
- ✅ Cambio visual inmediato a IN_PREPARATION
- ✅ Indicador de auto-completado
- ✅ No permite doble inicio (validación backend)
- ✅ Registro de timestamps

---

## 🔧 Decisiones Técnicas

### ¿Por qué polling en lugar de WebSockets?

**Razón:** Backend no expone WebSockets según FoodTech_v2.json

**Ventajas:**
- ✅ Implementación simple y pragmática
- ✅ Fácil de debuggear
- ✅ No requiere infraestructura adicional
- ✅ 5 segundos es aceptable para el caso de uso

**Posible mejora futura:** Migrar a WebSockets si backend lo soporta

---

### ¿Por qué filtrar en frontend?

**Razón:** API no soporta query params de filtrado

**Ventajas:**
- ✅ Respuesta instantánea (mejor UX)
- ✅ No sobrecarga el backend
- ✅ Funciona con el contrato existente

**Trade-off aceptable:** Volumen de tareas por estación es bajo (<50)

---

### ¿Por qué 3 vistas separadas si el código es idéntico?

**Razón:** Extensibilidad y claridad

**Ventajas:**
- ✅ Cada estación puede personalizarse independientemente en futuro
- ✅ Código explícito y fácil de entender
- ✅ Permite agregar lógica específica por estación sin afectar otras

**Alternativa descartada:** Vista genérica con parámetro de estación (menos clara)

---

## 📝 Mantenimiento

### Agregar nueva estación

1. Agregar constante en `models/Task.ts`:
```typescript
export const Station = {
  BAR: 'BAR',
  HOT_KITCHEN: 'HOT_KITCHEN',
  COLD_KITCHEN: 'COLD_KITCHEN',
  NEW_STATION: 'NEW_STATION',  // ← Nueva
} as const;
```

2. Crear vista `NewStationView.tsx`:
```typescript
export function NewStationView() {
  const stationData = useStationTasks(Station.NEW_STATION);
  return (
    <StationLayout
      stationName="Nueva Estación"
      stationCode="NEW_STATION"
      icon="kitchen"
    >
      {/* Filtros y Lista */}
    </StationLayout>
  );
}
```

3. Agregar ruta en `App.tsx`
4. Agregar link en `Navigation.tsx`

**Tiempo estimado:** 15 minutos

---

## 🐛 Troubleshooting

### "No se muestran tareas"

**Causa:** Backend no está corriendo o retorna []

**Solución:**
1. Verificar `http://localhost:8080/api/tasks/station/BAR`
2. Crear pedidos desde vista de mesero
3. Revisar console del navegador

---

### "Botón Iniciar no funciona"

**Causa:** Tarea ya está en IN_PREPARATION o error de red

**Solución:**
1. Verificar estado actual de la tarea
2. Revicar Network tab en DevTools
3. Verificar que backend responde a PATCH `/api/tasks/{id}/start`

---

### "Polling consume muchos recursos"

**Causa:** Interval muy bajo

**Solución:**
```typescript
// En la vista, aumentar intervalo:
const stationData = useStationTasks(Station.BAR, 10000); // 10s
```

---

## 📦 Resumen de Componentes

| Componente | Líneas | Responsabilidad | Dependencias |
|------------|--------|-----------------|--------------|
| TaskCard | 120 | Tarjeta de tarea | Task model |
| TaskList | 35 | Grid de tareas | TaskCard |
| TaskStatusFilter | 40 | Filtros | TaskStatus |
| StationLayout | 50 | Layout común | Ninguna |
| Navigation | 45 | Nav bar | react-router |
| useStationTasks | 80 | Lógica + estado | taskService |
| HotKitchenView | 60 | Vista estación | Hook + Componentes |
| BarView | 60 | Vista estación | Hook + Componentes |
| ColdKitchenView | 60 | Vista estación | Hook + Componentes |

**Total:** ~550 líneas de código limpio y mantenible

---

## ✨ Features Implementadas

- ✅ Diseño Midnight Gold profesional
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Polling automático cada 5s
- ✅ Filtros por estado con contadores
- ✅ Loading states granulares
- ✅ Manejo de errores
- ✅ Navegación entre vistas
- ✅ Iconografía Material Symbols
- ✅ Timestamps localizados en español
- ✅ Empty states elegantes
- ✅ Feedback visual por estado de tarea

---

**Autor:** Carlos  
**Fecha:** Enero 2026  
**Versión:** 1.0
