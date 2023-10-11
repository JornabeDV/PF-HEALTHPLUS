const { db } = require('../firebase');

const { FieldValue } = require('firebase-admin/firestore');

// --- Bring all doctors from data base ---

const bringDoctors = async () => {
    try {
        const allDoctors = await db.collection('doctors').where('enable', '==', true).get()
        const doctors = allDoctors.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return doctors;

    } catch (error) {
        throw new Error(error)
    }
};

// --- Bring a doctor from data base ---

const bringDoctorById = async (id) => {
    try {
        const doc = await db.collection('doctors').doc(id).get()
        const doctor = {
            id: doc.id,
            ...doc.data()
        };
        if (doctor.name) return doctor;
        else throw new Error(`No doctor matched with ID: ${id}`)

    } catch (error) {
        throw new Error(error)
    }
};

// --- Create a new doctor ---

const createDoctor = async (data) => {
    try {
        await db.collection('doctors').add({
            ...data,
            enable: true,
            rol: 'doctor',
            comments: [],
            dates: []
        });
        const doctor = {
            ...data
        }
        return doctor
    } catch (error) {
        throw new Error(error)
    }
};

// --- Bring doctor by name ---

const bringDoctorByName = async (name) => {
    try {
        const querySnapshot = await db.collection('doctors').where('name', '==', name).get();
        const doctors = [];
        querySnapshot.forEach((doc) => {
            doctors.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return doctors

    } catch (error) {
        throw new Error(error)
    }
};

// --- Delete a doctor ---

const deleteDoctor = async (id) => {
    try {
        const doc = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: doc.id,
            ...doc.data()
        };
        if (doctor.name) {
            await db.collection('doctors').doc(id).delete();
            return doctor;
        } else throw new Error(`doctor with id ${id} not found`);

    } catch (error) {
        throw new Error(error)
    }
}

// --- Disable a doctor ---

const disableDoctor = async (id) => {
    try {
        const disabledDoctor = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: disabledDoctor.id,
            ...disabledDoctor.data()
        }
        if (!doctor.name) throw new Error(`doctor with ID ${id} not found`);
        if (!doctor.enable) throw new Error(`doctor with ID ${id} already disabled`);

        await db.collection('doctors').doc(id).update({
            enable: false
        });
        doctor.enable = false;
        return doctor;

    } catch (error) {
        throw new Error(error)
    }
};

// --- Enable a doctor ---

const enableDoctor = async (id) => {
    try {
        const enabledDoctor = await db.collection('doctors').doc(id).get();
        const doctor = {
            id: enabledDoctor.id,
            ...enabledDoctor.data()
        }
        if (!doctor.name) throw new Error(`doctor with id ${id} not found`);
        if (doctor.enable) throw new Error(`doctor with ID ${id} already enabled`);

        await db.collection('doctors').doc(id).update({
            enable: true
        });
        doctor.enable = true;
        return doctor;

    } catch (error) {
        throw new Error(error)
    }
};

const putComments = async (data) => {
    try {
        const { userId } = data

        const userRef = await db.collection('users').doc(userId).get()
        user = {
            ...userRef.data()
        };

        const review = {
            date: data.date,
            userName: `${user.name} ${user.lastName}`,
            comment: data.comment,
            punctuation: data.punctuation            
        }

        const { doctorId } = data
        await db.collection('doctors').doc(doctorId).update({
            comments: FieldValue.arrayUnion(review)
        })
        return review
    } catch (error) {
        throw new Error(error)
    }
};


module.exports = { putComments, bringDoctors, bringDoctorById, createDoctor, bringDoctorByName, deleteDoctor, disableDoctor, enableDoctor };

