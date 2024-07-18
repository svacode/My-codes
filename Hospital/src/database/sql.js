import mysql from "mysql2";
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'newdb',
    password: ' ',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();



export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`
        SELECT dct_id AS id, dct_name AS name, dct_pass AS password, role FROM doctor
        UNION
        SELECT nurse_id AS id, nurse_name AS name, nurse_pass AS password, role FROM nurse
        UNION
        SELECT patient_id AS id, patient_name AS name, patient_pass AS password, role FROM patient
        UNION
        SELECT admin_id AS id, admin_name AS name, admin_pass AS password, role FROM admins
    `);
    return rows;
},


  getDoctors: async () => {
      const [rows] = await promisePool.query(`SELECT * FROM Doctor
      `);
      return rows;
    },

    getNurses: async () => {
      const [rows] = await promisePool.query(`SELECT nurse_id AS ID, nurse_name AS Name, nurse_address AS Address, nurse_phonenum AS PhoneNumber, 
      nurse_pass AS Password, Medical_specialty_dep_id AS DepartmentID
      FROM Nurse
      `);
      return rows;
    },
  
    getPatients: async () => {
      const [rows] = await promisePool.query(`SELECT * FROM Patient
      `);
      return rows;
    },

    getReservationsByPatientId: async (patientId) => {
      const query = `
          SELECT * FROM Reservation
          WHERE Patient_patient_id = ?`;

      try {
          const [rows] = await promisePool.query(query, [patientId]);
          return rows;
      } catch (error) {
          console.error(error);
          throw new Error('Error fetching reservations');
      }
  
  },
    getExamination: async () => {
      const [rows] = await promisePool.query(`SELECT * from Examination
      `);
      return rows;
    },
    getTreatment: async () => {
      const [rows] = await promisePool.query(`SELECT * from Treatment
      `);
      return rows;
    },
    getPatientData: async (patientId) => {
      const query = `
      SELECT * from Patient
      WHERE patient_id = ?`;
      
      try {
        const [rows] = await promisePool.query(query, [patientId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error');
    }

},
  
};
export const searchSql = {
searchPatients: async (patientName, socSecNum, phoneNum) => {
  const query = `
      SELECT * FROM Patient 
      WHERE 
          patient_name LIKE ? AND 
          patient_soc_secnum = ? AND 
          patient_phonenum = ?`;

  const values = [
      `%${patientName}%`, 
      socSecNum, 
      phoneNum,
  ];

  const [rows] = await promisePool.query(query, values);
  console.log("Query Results:", rows);
  return rows;
}
};

export const deleteSql = {
  deleteExamination: async (Doctor_dct_id, Patient_patient_id) => {
      const [rows] = await promisePool.query(
          `DELETE FROM Examination WHERE Doctor_dct_id = ? AND Patient_patient_id = ?`,
          [Doctor_dct_id, Patient_patient_id]
      );
      return rows;
  },
  deleteTreatment: async (Nurse_nurse_id, Patient_patient_id) => {
    const [rows] = await promisePool.query(
      `DELETE FROM Treatment WHERE Nurse_nurse_id = ? AND Patient_patient_id = ?`,
      [Nurse_nurse_id, Patient_patient_id]
    );
    return rows;
  },
  cancelReservation: async (reservationId) => {
    const [rows] = await promisePool.query(`DELETE FROM Reservation WHERE res_num = ?`,
    [reservationId]
    );
},
deleteDoctors: async (dct_id) => {
  const [rows] = await promisePool.query(
    `DELETE FROM Doctor WHERE dct_id = ?`,
    [dct_id]
  );
  return rows;
},
  deleteNurses: async (nurse_id) => {
    const [rows] = await promisePool.query(
      `DELETE FROM Nurse WHERE nurse_id = ?`,
      [nurse_id]
    );
  return rows;
},
};


export const editSql = {
  editExamination: async (Doctor_dct_id, Patient_patient_id, updatedData) => {
      const { exam_date, exam_details } = updatedData;
      const [rows] = await promisePool.query(
          `UPDATE Examination           
           SET exam_date = ?, exam_details = ?
           WHERE Doctor_dct_id = ? AND Patient_patient_id = ?`,
          [exam_date, exam_details, Doctor_dct_id, Patient_patient_id]
      );
      return rows;
  },
  editTreatment: async (Nurse_nurse_id, Patient_patient_id, updatedData) => {
    const { treat_datetime, treat_details } = updatedData;
    const [rows] = await promisePool.query(
      `UPDATE Treatment
       SET treat_datetime = ?, treat_details = ?
       WHERE Nurse_nurse_id = ? AND Patient_patient_id = ?`,
      [treat_datetime, treat_details, Nurse_nurse_id, Patient_patient_id]
    );
    return rows;
  },

  editNurse: async (nurse_id, updatedData) => {
    const { nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id } = updatedData;
    const [rows] = await promisePool.query(
      `UPDATE Nurse
       SET nurse_name = ?, nurse_address = ?, nurse_phonenum = ?, nurse_pass = ?, Medical_specialty_dep_id = ?
       WHERE nurse_id = ?`,
      [nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id, nurse_id]
    );
    return rows;
  },

  editDoctor: async (dct_id, updatedData) => {
    const { dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id} = updatedData;
    const [rows] = await promisePool.query(
      `UPDATE Doctor
       SET dct_name = ?, dct_address = ?, dct_phonenum = ?, dct_pass = ?, Medical_specialty_dep_id = ?
       WHERE dct_id = ?`,
      [dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id, dct_id]
    );
    return rows;
  },
};

export const createSql = {
    enterExamination: async (Doctor_dct_id, Patient_patient_id, exam_date, exam_details) => {
        const [rows] = await promisePool.query(
            `
            INSERT INTO Examination (Doctor_dct_id, Patient_patient_id, exam_date, exam_details) VALUES (?, ?, ?, ?);
            `,
            [Doctor_dct_id, Patient_patient_id, exam_date, exam_details]
        );
        return rows;
    },
    enterTreatment: async (Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details) => {
      const [rows] = await promisePool.query(
        `
        INSERT INTO Treatment (Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details) VALUES (?, ?, ?, ?);
        `,
        [Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details]
      );
      return rows;
    },
    enterNurse: async (nurse_id, nurse_name, nurse_address, nurse_phonenum, nurse_pass,Medical_specialty_dep_id, role) => {
      const [rows] = await promisePool.query(
        `
        INSERT INTO Nurse (nurse_id, nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id, role ) VALUES (?, ?, ?, ?, ?, ?,?);
        `,
        [nurse_id, nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id, role]
      );
      return rows;
    },
    enterDoctor: async (dct_id, dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id, role) => {
      const [rows] = await promisePool.query(
        `
        INSERT INTO Doctor (dct_id, dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id, role ) VALUES (?, ?, ?, ?, ?,?,?);
        `,
        [dct_id, dct_name, dct_address, dct_phonenum,dct_pass, Medical_specialty_dep_id, role]
      );
      return rows;
    },

      createReservation: async (patientId, specialtyDepId, resDateTime) => {
        const query = `
          INSERT INTO Reservation (Patient_patient_id, Medical_specialty_dep_id, res_datetime)
          VALUES (?, ?, ?)`;
        try {
          const [result] = await promisePool.query(query, [patientId, specialtyDepId, resDateTime]);
          return result.insertId;
        } catch (error) {
          console.error(error);
          throw error; // Handle the error appropriately
        }
      },
      // Add other reservation-related queries as needed
};



    
export default pool;