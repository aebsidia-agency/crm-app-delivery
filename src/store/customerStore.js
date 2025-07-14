import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const createCustomer = (data) => ({
  id: Date.now().toString(),
  ...data,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useCustomerStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        customers: [],
        isLoading: false,
        error: null,
        filterStatus: 'Все',
        searchQuery: '',

        // Actions
        addCustomer: (customerData) => {
          const newCustomer = createCustomer(customerData);
          set((state) => ({
            customers: [...state.customers, newCustomer],
            error: null,
          }));
        },

        updateCustomer: (id, updates) => {
          set((state) => ({
            customers: state.customers.map((customer) =>
              customer.id === id
                ? { ...customer, ...updates, updatedAt: new Date().toISOString() }
                : customer
            ),
            error: null,
          }));
        },

        deleteCustomer: (id) => {
          set((state) => ({
            customers: state.customers.filter((customer) => customer.id !== id),
            error: null,
          }));
        },

        setFilterStatus: (status) => {
          set({ filterStatus: status });
        },

        setSearchQuery: (query) => {
          set({ searchQuery: query });
        },

        setLoading: (loading) => {
          set({ isLoading: loading });
        },

        setError: (error) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },

        // Computed
        getFilteredCustomers: () => {
          const { customers, filterStatus, searchQuery } = get();
          
          let filtered = customers;

          // Filter by status
          if (filterStatus !== 'Все') {
            filtered = filtered.filter((customer) => customer.status === filterStatus);
          }

          // Filter by search query
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
              (customer) =>
                customer.name.toLowerCase().includes(query) ||
                customer.phone.toLowerCase().includes(query) ||
                customer.order.toLowerCase().includes(query)
            );
          }

          return filtered;
        },

        getStats: () => {
          const { customers } = get();
          return {
            total: customers.length,
            newOrders: customers.filter((c) => c.status === 'Новый').length,
            processing: customers.filter((c) => c.status === 'Собирается').length,
            delivered: customers.filter((c) => c.status === 'Доставлено').length,
          };
        },
      }),
      {
        name: 'customer-storage',
        partialize: (state) => ({ customers: state.customers }),
      }
    ),
    {
      name: 'customer-store',
    }
  )
); 