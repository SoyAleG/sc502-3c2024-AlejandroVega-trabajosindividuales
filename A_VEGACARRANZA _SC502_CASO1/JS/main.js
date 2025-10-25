const form = document.getElementById('studentForm');
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const notaInput = document.getElementById('nota');
const tableBody = document.querySelector('#studentsTable tbody');
const limpiarBtn = document.getElementById('limpiarBtn');
const STORAGE_KEY = 'students_SC502_case1';

function loadStudents() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); }
  catch { return []; }
}

function saveStudents(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function renderTable() {
  const students = loadStudents();
  tableBody.innerHTML = '';
  if (students.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="4">No hay registros</td>';
    tableBody.appendChild(tr);
    return;
  }
  students.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i + 1}</td>
                    <td>${escapeHtml(s.nombre)}</td>
                    <td>${escapeHtml(s.apellidos)}</td>
                    <td>${s.nota}</td>`;
    tableBody.appendChild(tr);
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function validateInputs(nombre, apellidos, nota) {
  if (!nombre.trim()) return { ok: false, msg: 'El campo Nombre es obligatorio.' };
  if (!apellidos.trim()) return { ok: false, msg: 'El campo Apellidos es obligatorio.' };
  if (nota === '' || nota === null || isNaN(nota)) return { ok: false, msg: 'La Nota debe ser un número entre 0 y 100.' };
  const n = Number(nota);
  if (n < 0 || n > 100) return { ok: false, msg: 'La Nota debe estar entre 0 y 100.' };
  return { ok: true };
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = nombreInput.value;
  const apellidos = apellidosInput.value;
  const notaRaw = notaInput.value;
  const valid = validateInputs(nombre, apellidos, notaRaw);
  if (!valid.ok) {
    Swal.fire({ icon: 'error', title: 'Error', text: valid.msg });
    return;
  }
  const student = { nombre: nombre.trim(), apellidos: apellidos.trim(), nota: Number(notaRaw) };
  const students = loadStudents();
  students.push(student);
  saveStudents(students);
  Swal.fire({ icon: 'success', title: 'Registro exitoso', text: 'Estudiante registrado correctamente.' });
  form.reset();
  renderTable();
});

limpiarBtn.addEventListener('click', () => {
  Swal.fire({
    title: '¿Borrar todos los registros?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.removeItem(STORAGE_KEY);
      renderTable();
      Swal.fire('Borrado', 'Todos los registros han sido eliminados.', 'success');
    }
  });
});

renderTable();