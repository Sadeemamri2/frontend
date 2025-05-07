import React, { useEffect, useState } from 'react';
import {
  fetchLessons,
  createLesson,
  updateLesson,
  deleteLesson
} from '../../utilitis/api_request';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    day: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editLesson, setEditLesson] = useState({
    title: '',
    description: '',
    day: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchLessons()
      .then((data) => {
        // أضف خاصية isVisible لكل درس عند تحميلهم
        const lessonsWithVisibility = data.map((lesson) => ({
          ...lesson,
          isVisible: false
        }));
        setLessons(lessonsWithVisibility);
        setError(null);
      })
      .catch(() => setError('Failed to load lessons'))
      .finally(() => setLoading(false));
  }, []);


  const handleAddLesson = () => {
    if (!newLesson.title.trim() || !newLesson.description.trim() || !newLesson.day.trim()) return;
    setLoading(true);

    createLesson(newLesson)
      .then((lesson) => {
        // أضف isVisible = true للدرس الجديد بعد حفظه
        const lessonWithVisibility = { ...lesson, isVisible: true };
        setLessons([...lessons, lessonWithVisibility]);
        setNewLesson({ title: '', description: '', day: '' });
        setError(null);
      })
      .catch(() => setError('Failed to add lesson'))
      .finally(() => setLoading(false));
  };


  const handleUpdateLesson = (id) => {
    if (!editLesson.title.trim() || !editLesson.description.trim() || !editLesson.day.trim()) return;
    setLoading(true);
    updateLesson(id, editLesson)
      .then((updated) => {
        setLessons(lessons.map((lesson) => (lesson.id === id ? updated : lesson)));
        setEditingId(null);
        setEditLesson({ title: '', description: '', day: '' });
        setError(null);
      })
      .catch(() => setError('Failed to update lesson'))
      .finally(() => setLoading(false));
  };

  const handleDeleteLesson = (id) => {
    setLoading(true);
    deleteLesson(id)
      .then(() => {
        setLessons(lessons.filter((lesson) => lesson.id !== id));
        setError(null);
      })
      .catch(() => setError('Failed to delete lesson'))
      .finally(() => setLoading(false));
  };

  const toggleVisibility = (id) => {
    setLessons(lessons.map((lesson) =>
      lesson.id === id ? { ...lesson, isVisible: !lesson.isVisible } : lesson
    ));
  };

  return (
    <div className="lessons-page">
      <h2>Manage Lessons</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="add-lesson">
        <input
          type="text"
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
        />
        <textarea
          placeholder="Lesson Description"
          value={newLesson.description}
          onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
        />
        <select
          value={newLesson.day}
          onChange={(e) => setNewLesson({ ...newLesson, day: e.target.value })}
        >
          <option value="">Select Day</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
        </select>
        <button onClick={handleAddLesson} disabled={loading}>
          {loading ? 'Adding...' : 'Add Lesson'}
        </button>
        <button onClick={() => navigate('/dashboard')} className="btn1">
          Return to Dashboard
        </button>
      </div>

      {loading ? (
        <div>Loading lessons...</div>
      ) : (
        <div className="lesson-list">
          {lessons.length === 0 ? (
            <p>No lessons available</p>
          ) : (
            lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                {editingId === lesson.id ? (
                  <>
                    <input
                      type="text"
                      value={editLesson.title}
                      onChange={(e) => setEditLesson({ ...editLesson, title: e.target.value })}
                    />
                    <textarea
                      value={editLesson.description}
                      onChange={(e) =>
                        setEditLesson({ ...editLesson, description: e.target.value })
                      }
                    />
                    <select
                      value={editLesson.day}
                      onChange={(e) =>
                        setEditLesson({ ...editLesson, day: e.target.value })
                      }
                    >
                      <option value="">Select Day</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                    </select>
                    <button onClick={() => handleUpdateLesson(lesson.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <h3>{lesson.title}</h3>

                    {lesson.isVisible && (
                      <>
                        <p className="description">{lesson.description}</p>
                        <p className="day">{lesson.day}</p>
                      </>
                    )}
                    <div className="actions">
                      <button
                        onClick={() => {
                          setEditingId(lesson.id);
                          setEditLesson({
                            title: lesson.title,
                            description: lesson.description,
                            day: lesson.day
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteLesson(lesson.id)}>Delete</button>
                      <button onClick={() => toggleVisibility(lesson.id)}>
                        {lesson.isVisible ? 'Hide Content' : 'Show Content'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
