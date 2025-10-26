import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, adminMealsAPI, adminCategoriesAPI } from '../services/api';
import { Meal, Category } from '../types';

const AdminDashboard: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<'meals' | 'categories'>('meals');
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: "" as string | number,
    orderNumber: "" as string | number,
    category_id: '' as string | number,
    ingredients: [] as string[],
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    orderNumber: '' as string | number,
  });
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchMeals(), fetchCategories()]);
  };

  const checkAuth = async () => {
    try {
      await authAPI.verifyToken();
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/admin');
    }
  };

  const fetchMeals = async () => {
    try {
      const data = await adminMealsAPI.getAll();
      setMeals(data.meals || []);
    } catch (error) {
      setMeals([]);
      alert('Backend serverga ulanib bo\'lmadi. Iltimos, backend ishlab turganini tekshiring.');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminCategoriesAPI.getAll();
      setCategories(data.categories || []);
    } catch (error) {
      setCategories([]);
      console.error('Categories fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const openModal = (meal?: Meal) => {
    if (meal) {
      setEditingMeal(meal);
      setFormData({
        name: meal.name,
        image: meal.image || '',
        description: meal.description,
        price: meal.price.toString(), // Convert number to string for form
        orderNumber: meal.orderNumber?.toString() || '',
        category_id: meal.category_id || '',
        ingredients: meal.ingredients,
      });
      setImagePreview(meal.image || '');
    } else {
      setEditingMeal(null);
      setFormData({
        name: '',
        image: '',
        description: '',
        price: '',
        orderNumber: '',
        category_id: '',
        ingredients: [],
      });
      setImagePreview('');
    }
    setSelectedFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMeal(null);
    setIngredientInput('');
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let dataToSend;
      
      if (selectedFile) {
        // If file is selected, create FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description || '');
        formDataToSend.append('price', (Number(formData.price) || 0).toString());
        formDataToSend.append('orderNumber', (Number(formData.orderNumber) || 0).toString());
        formDataToSend.append('category_id', formData.category_id.toString());
        formDataToSend.append('ingredients', JSON.stringify(formData.ingredients));
        formDataToSend.append('image', selectedFile);
        
        dataToSend = formDataToSend;
      } else {
        // If no file, send regular JSON data
        dataToSend = {
          ...formData,
          description: formData.description || '',
          image: formData.image || '',
          price: Number(formData.price) || 0,
          orderNumber: Number(formData.orderNumber) || 0
        };
      }
      
      if (editingMeal) {
        await adminMealsAPI.update(editingMeal.id, dataToSend);
      } else {
        await adminMealsAPI.create(dataToSend);
      }
      fetchMeals();
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      try {
        await adminMealsAPI.delete(id);
        fetchMeals();
      } catch (error: any) {
        alert(error.response?.data?.message || 'Xatolik yuz berdi');
      }
    }
  };

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredientInput.trim()],
      });
      setIngredientInput('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  // Category management functions
  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        orderNumber: category.orderNumber || '',
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({
        name: '',
        orderNumber: '',
      });
    }
    setShowCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...categoryFormData,
        orderNumber: Number(categoryFormData.orderNumber) || 0
      };
      
      if (editingCategory) {
        await adminCategoriesAPI.update(editingCategory.id, dataToSend);
      } else {
        await adminCategoriesAPI.create(dataToSend);
      }
      await fetchCategories();
      closeCategoryModal();
    } catch (error) {
      alert('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    }
  };

  const deleteCategory = async (id: number) => {
    if (window.confirm('Bu kategoriyani o\'chirishni xohlaysizmi?')) {
      try {
        await adminCategoriesAPI.delete(id);
        await fetchCategories();
      } catch (error) {
        alert('Xatolik yuz berdi. Kategoriyada taomlar mavjud bo\'lishi mumkin.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-500">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full sm:w-auto"
            >
              Saytga qaytish
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full sm:w-auto"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('meals')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'meals'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Taomlar ({meals.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kategoriyalar ({categories.length})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'meals' && (
          <>
            <div className="mb-6">
              <button
                onClick={() => openModal()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 w-full sm:w-auto"
              >
                + Yangi taom qo'shish
              </button>
            </div>

        {/* Meals Table */}
        {meals && meals.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rasm
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategoriya
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Narx
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meals.map((meal) => (
                  <tr key={meal.id}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      {meal.image ? (
                        <img src={meal.image} alt={meal.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{meal.name}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {meal.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-900">
                        {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <button
                        onClick={() => openModal(meal)}
                        className="text-blue-600 hover:text-blue-900 mr-3 sm:mr-4"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => handleDelete(meal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Taomlar yo'q</h3>
            <p className="mt-1 text-sm text-gray-500">Yangi taom qo'shish uchun yuqoridagi tugmani bosing.</p>
            <div className="mt-6">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 w-full sm:w-auto justify-center"
              >
                + Birinchi taomni qo'shish
              </button>
            </div>
          </div>
        )}
          </>
        )}

        {activeTab === 'categories' && (
          <>
            <div className="mb-6">
              <button
                onClick={() => openCategoryModal()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 w-full sm:w-auto"
              >
                + Yangi kategoriya qo'shish
              </button>
            </div>

            {/* Categories Table */}
            {categories && categories.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nomi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tartib raqami
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {category.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {category.orderNumber || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openCategoryModal(category)}
                                className="text-orange-600 hover:text-orange-900"
                              >
                                Tahrirlash
                              </button>
                              <button
                                onClick={() => deleteCategory(category.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                O'chirish
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Kategoriyalar yo'q</h3>
                <p className="mt-1 text-sm text-gray-500">Yangi kategoriya qo'shish uchun yuqoridagi tugmani bosing.</p>
                <div className="mt-6">
                  <button
                    onClick={() => openCategoryModal()}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 w-full sm:w-auto justify-center"
                  >
                    + Birinchi kategoriyani qo'shish
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingMeal ? 'Taomni tahrirlash' : 'Yangi taom qo\'shish'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rasm (ixtiyoriy)</label>
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Yoki URL kiritish uchun quyidagi maydonni to'ldiring</p>
                    </div>
                    
                    {/* URL Input */}
                    <div>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          if (e.target.value) {
                            setImagePreview(e.target.value);
                            setSelectedFile(null);
                          }
                        }}
                        placeholder="Rasm URL manzili"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif (ixtiyoriy)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                    placeholder="Taom haqida qo'shimcha ma'lumot..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Narx (so'm) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                      required
                      min="0"
                    />
                    <span className="absolute right-3 top-2 text-gray-500 text-sm">so'm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tartib raqami <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0"
                    required
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Taomlar ushbu tartib raqami bo'yicha ko'rsatiladi</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategoriya <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Kategoriyani tanlang</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tarkib (ixtiyoriy)</label>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      value={ingredientInput}
                      onChange={(e) => setIngredientInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ingredientni kiriting"
                    />
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                    >
                      Qo'shish
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.ingredients.map((ing, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {ing}
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600"
                  >
                    {editingMeal ? 'Yangilash' : 'Qo\'shish'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingCategory ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya qo\'shish'}
              </h2>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomi</label>
                  <input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tartib raqami</label>
                  <input
                    type="number"
                    value={categoryFormData.orderNumber}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0"
                    min="0"
                  />
                </div>


                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeCategoryModal}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    {editingCategory ? 'Yangilash' : 'Qo\'shish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

