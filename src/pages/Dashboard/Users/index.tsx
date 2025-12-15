// DashboardUsers.tsx
import { useLayoutEffect, type FC } from 'react';
import { Card, Button } from "@/common/components";
import { useUsersStore } from '@/common/stores/pages/Dashboard/Users';
import '@/common/styles/pages/Dashboard/Users/index.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { itemsPerPageOptions } from '@/assets/data/pages/Dashboard/Users/paginationarray';
import { useNavigate } from 'react-router';
import { FaUsers } from 'react-icons/fa6';

export const DashboardUsers: FC = () => {
    const { users, getUsers, getNationalities, currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, renderPageNumbers, nationalities, gender, nationality, age, handleGenderChange, handleNationalityChange, handleAgeChange, resetFilters, handleExportCSV, handleDeleteUser, handleViewUser } = useUsersStore();
    const navigate = useNavigate();
    useLayoutEffect(() => {
        getUsers();
        getNationalities();
    }, [getUsers, getNationalities]);

    const filteredUsers = users.filter(user => {
        let isValid = true;
        if (gender && user.gender !== gender) isValid = false;
        if (nationality && user.nat !== nationality) isValid = false;
        if (age && user.dob.age !== age) isValid = false;
        return isValid;
    });

    const pages = Math.ceil(filteredUsers.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const hasFilters = gender !== '' || nationality !== '' || age !== 0;

    return (
        <div className="dashboard-users">
            <div className="dashboard-users-header">
                <FaUsers className="dashboard-users-icon" />
                <h1 className="dashboard-users-title">Usuarios</h1>
            </div>

            <div className="dashboard-users-filters">
                <select id='select-gender' className="dashboard-users-filter" value={gender} onChange={handleGenderChange}>
                    <option value="">Género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                </select>

                <select id='select-nationality' className="dashboard-users-filter" value={nationality} onChange={handleNationalityChange}>
                    <option value="">Nacionalidad</option>
                    {nationalities.map(nat => (
                        <option key={nat} value={nat}>{nat}</option>
                    ))}
                </select>

                <div className="dashboard-users-filter-range">
                    <span>0</span>
                    <input type="range" className="dashboard-users-filter" min="0" max="100" value={age} onChange={handleAgeChange} />
                    <span>{age}</span>
                </div>

                <div className="dashboard-users-filter-buttons">
                    {hasFilters && (
                        <Button className="dashboard-users-filter-button" onClick={resetFilters}>Restablecer</Button>
                    )}
                    <Button className="dashboard-users-filter-button" onClick={handleExportCSV}>Exportar a CSV</Button>
                </div>
            </div>

            <div className="dashboard-users-cards">
                {filteredUsers.slice(start, end).map((user) => (
                    <Card
                        type='normal'
                        key={user.login.uuid}
                        user={user}                          // <-- agregado
                        title={`${user.name.first} ${user.name.last}`}
                        image={user.picture.medium}
                        alt={user.name.first}
                        onDelete={() => handleDeleteUser(navigate, user.login.uuid)}
                        onView={() => handleViewUser(navigate, user.login.uuid)}
                    />
                ))}

            </div>

            <div className="dashboard-users-pagination">
                <div className="dashboard-users-pagination-pages">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <FaChevronLeft />
                    </button>
                    {renderPageNumbers(pages, currentPage).map((page, index) => (
                        <button key={index} className={currentPage === page ? 'active' : ''} onClick={() => handlePageChange(page)} disabled={page === '...'}>
                            {page}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pages}>
                        <FaChevronRight />
                    </button>
                </div>

                {/* new wrapper: label above select */}
                <div className="dashboard-users-pagination-controls">
                    <label htmlFor="items-per-page" className="dashboard-users-pagination-label">Filas por página</label>
                    <select id="items-per-page" className="dashboard-users-pagination-select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        {itemsPerPageOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};