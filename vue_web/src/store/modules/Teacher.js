const state = {
    teachers: [
      { id: 1, name: 'Иван Иванов' },
      { id: 2, name: 'Петр Петров' }
    ]
  };
  
  const getters = {
    allTeachers: state => state.teachers
  };
  
  const actions = {
    // Для примера, здесь могут быть асинхронные действия
  };
  
  const mutations = {
    // Для примера, здесь могут быть мутации для изменения состояния
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };